import { useState, useEffect } from "react";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid; 



  const fetchJournalEntries = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const journalRef = collection(db, "users", userId, "journalEntries");
      const querySnapshot = await getDocs(journalRef);
      const fetchedEntries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(fetchedEntries);
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createJournalEntry = async (title, content, date = new Date()) => {
    if (!userId) return; 
    const journalRef = collection(db, "users", userId, "journalEntries");
    try {
      const newDocRef = await addDoc(journalRef, {
        date: date.toISOString(),
        title: title || "Untitled",
        content: content || "",
      });
      setEntries(prevEntries => [
        ...prevEntries,
        { id: newDocRef.id, date: date.toISOString(), title, content },
      ]);
    } catch (error) {
      console.error("Error creating journal entry:", error.message);
    }
  };

  const updateJournalEntry = async (entryId, updatedData) => {
    if (!userId) return; 
    const entryRef = doc(db, "users", userId, "journalEntries", entryId);
    try {
      await updateDoc(entryRef, updatedData);
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === entryId ? { ...entry, ...updatedData } : entry
        )
      );
    } catch (error) {
      console.error("Error updating journal entry:", error.message);
    }
  };

  const deleteJournalEntry = async (entryId) => {
    if (!userId) return; 
    const entryRef = doc(db, "users", userId, "journalEntries", entryId);
    try {
      await deleteDoc(entryRef);
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error("Error deleting journal entry:", error.message);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, [userId]);

  return {
    entries,
    loading,
    fetchJournalEntries,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
  };
}

export default useJournal;

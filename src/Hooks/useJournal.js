import { useState, useEffect } from "react";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid; // Get the currently logged-in user's ID

  // Fetch all journal entries for the logged-in user
  const fetchJournalEntries = async () => {
    if (!userId) return; // Exit if no user is logged in
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

  // Create a new journal entry
  const createJournalEntry = async (title, content, date = new Date()) => {
    if (!userId) return; // Exit if no user is logged in
    const journalRef = collection(db, "users", userId, "journalEntries");
    try {
      const newDocRef = await addDoc(journalRef, {
        date: date.toISOString(),
        title: title || "Untitled",
        content: content || "",
      });
      // Update local state
      setEntries(prevEntries => [
        ...prevEntries,
        { id: newDocRef.id, date: date.toISOString(), title, content },
      ]);
    } catch (error) {
      console.error("Error creating journal entry:", error.message);
    }
  };

  // Update an existing journal entry
  const updateJournalEntry = async (entryId, updatedData) => {
    if (!userId) return; // Exit if no user is logged in
    const entryRef = doc(db, "users", userId, "journalEntries", entryId);
    try {
      await updateDoc(entryRef, updatedData);
      // Update local state
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === entryId ? { ...entry, ...updatedData } : entry
        )
      );
    } catch (error) {
      console.error("Error updating journal entry:", error.message);
    }
  };

  // Delete a journal entry
  const deleteJournalEntry = async (entryId) => {
    if (!userId) return; // Exit if no user is logged in
    const entryRef = doc(db, "users", userId, "journalEntries", entryId);
    try {
      await deleteDoc(entryRef);
      // Update local state
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error("Error deleting journal entry:", error.message);
    }
  };

  // Fetch entries on initial render or when the user changes
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

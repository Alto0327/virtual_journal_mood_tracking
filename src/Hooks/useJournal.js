import { useState, useEffect } from "react";
import { collection, addDoc, doc, getDocs, updateDoc} from "firebase/firestore"
import { auth , db } from "../firebase";


function useJournal(){
    const [entries, setEntries] = useState([])
    const userId = auth.currentUser?.uid
    
    
    const fetchJournalEntry = async() =>{
        if(!userId) return
        try{
            const journalRef = collection(db, "users", userId, "journalEntries");
            const querySnapshot = await getDocs(journalRef)
            const fetchedEntries = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEntries(fetchedEntries)
        }catch(error){
            console.error("Error Fetching", error.message)
        }

    }

    const createJournalEntry = async({date, title, content}) => {
        if(!userId) return
        const journalRef = collection(db, "users", userId, "journalEntries");
        try{
            const newDocRef = await addDoc(journalRef,{
                date: date.toISOString(),
                title: title || date.toISOString(),
                content: content || "",
            })
            setEntries(prevEntries => [
                ...prevEntries,
                {id: newDocRef.id, date: date.toISOString(), title, content}
            ])
        }catch(error){
            console.error("Error Creating", error.message)
        }
    }

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

    useEffect(() => {
        fetchJournalEntry();
      }, [userId,updateJournalEntry]);


    return{
        entries,
        fetchJournalEntry,
        createJournalEntry,
        updateJournalEntry
    }
}

export default useJournal
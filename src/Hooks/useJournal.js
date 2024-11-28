import { doc, getDoc} from "firebase/firestore"
import { auth , db } from "../firebase";
import { useState, useEffect } from "react";


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
        }catch( error ){
            console.error("Error Fetching", error.message)
        }
    }
    return{
        entries,
        fetchJournalEntry
    }
}

export default useJournal
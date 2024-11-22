import { useState, useEffect } from 'react'
import './Home.css' 
import useJournal from '../../Hooks/useJournal';

function Main() {
    const { entries, loading, createJournalEntry, updateJournalEntry, deleteJournalEntry } = useJournal();
    const [newEntry, setNewEntry] = useState({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
  
    const handleCreate = () => {
      createJournalEntry(newEntry.title, newEntry.content, new Date(newEntry.date));
      setNewEntry({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
    };

    return (
        <div className='Home'>
             <h1>Journal</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <small>{new Date(entry.date).toLocaleDateString()}</small>
              <button onClick={() => deleteJournalEntry(entry.id)}>Delete</button>
              <button
                onClick={() => updateJournalEntry(entry.id, { title: "Updated Title", content: "Updated Content" })}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Add New Entry</h2>
      <input
        type="text"
        placeholder="Title"
        value={newEntry.title}
        onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newEntry.content}
        onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
      />
      <input
        type="date"
        value={newEntry.date}
        onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
      />
      <button onClick={handleCreate}>Add Entry</button>
        </div>
    )
}

export default Main
import { useState, useEffect, useContext } from 'react'
import './Home.css' 
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'
import useJournal from '../../Hooks/useJournal';

function Main() {
  const { currentUser } = useContext(UserContext)  
    const { entries, loading, createJournalEntry, updateJournalEntry, deleteJournalEntry } = useJournal();
    const [newEntry, setNewEntry] = useState({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
  
    const handleCreate = () => {
      createJournalEntry(newEntry.title, newEntry.content, new Date(newEntry.date));
      setNewEntry({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
    };

  return (
    <div>
      {currentUser !== null ? 
        (
          <div>
            <h1>Welcome in</h1>
          <ul>
              {entries.map(entry => (
                <li key={entry.id}>
                  <h3>{entry.title}</h3>
                  <p>{entry.content}</p>
                  <small>{new Date(entry.date).toLocaleDateString()}</small>
                  <button onClick={() => deleteJournalEntry(entry.id)}>Delete</button>
                  <button
                    // FIXME: make it so i can actually edit it 
                    onClick={() => updateJournalEntry(entry.id, { title: "Updated Title", content: "Updated Content" })}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
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
          ):(
            <div>
              <h1>Not logged in</h1>
              <button>
                <Link to="/init">Login</Link>
              </button>
            </div>
          )
        }
      </div>
    // <div className='Home'>
    //   <h1>Journal</h1>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <ul>
    //       {entries.map(entry => (
    //         <li key={entry.id}>
    //           <h3>{entry.title}</h3>
    //           <p>{entry.content}</p>
    //           <small>{new Date(entry.date).toLocaleDateString()}</small>
    //           <button onClick={() => deleteJournalEntry(entry.id)}>Delete</button>
    //           <button
    //           // FIXME: make it so i can actually edit it 
    //             onClick={() => updateJournalEntry(entry.id, { title: "Updated Title", content: "Updated Content" })}
    //           >
    //             Edit
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}

    //   <h2>Add New Entry</h2>
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     value={newEntry.title}
    //     onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
    //   />
    //   <textarea
    //     placeholder="Content"
    //     value={newEntry.content}
    //     onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
    //   />
    //   <input
    //     type="date"
    //     value={newEntry.date}
    //     onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
    //   />
    //   <button onClick={handleCreate}>Add Entry</button>
    //     </div>
  )
}

export default Main
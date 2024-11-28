import { useState, useEffect, useContext } from 'react'
import './Home.css' 
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'
import useJournal from '../../Hooks/useJournal'


function Home() {
  const { currentUser } = useContext(UserContext)  
  const { entries, createJournalEntry,updateJournalEntry } = useJournal()
  const [newEntry, setNewEntry] = useState({ title: "", content: "", date: new Date().toISOString().split("T")[0] });

  const handleCreate = () => {
    createJournalEntry({
      title: newEntry.title,
      content: newEntry.content,
      date: new Date(newEntry.date)

    });
    setNewEntry({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
  };

  return (
    <div>
      {currentUser !== null ? 
        (
        <div>
            <h1>Welcome in</h1>
            {entries && entries.length > 0 ? 
              (
                <ul>
                  {entries.map(entry => (
                    <li key={entry.id}>
                      <h3>{entry.title}</h3>
                      <small>{new Date(entry.date).toLocaleDateString()}</small>
                    </li>
                  ))}
                </ul>
              ):(
                <h1>no value</h1>
            )}
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
  )
}

export default Home
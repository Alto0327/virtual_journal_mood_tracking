import { useState, useEffect, useContext } from 'react'
import './Home.css' 
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'
import useJournal from '../../Hooks/useJournal'


function Home({curEntry}) {
  const { currentUser } = useContext(UserContext)  
  const {createJournalEntry, updateJournalEntry } = useJournal()
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
          {curEntry ? (
          <div>
            <h3>{curEntry.title}</h3>
            <p>{curEntry.content}</p>
            <small>{curEntry.date.split("T")[0]}</small>
          </div>
        ) : (
          <p>No entry selected</p>
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
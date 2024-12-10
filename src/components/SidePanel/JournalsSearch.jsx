import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import useJournal from "../../Hooks/useJournal";

const JournalsSearch = () => {
const { currentUser } = useContext(UserContext)
const { entries, createJournalEntry, updateJournalEntry } = useJournal()



  return (
    <div className="journal-container">
      <form>
        <label>
          <h4>Search Journal</h4>
        </label>
        <input/>
       
      </form>
      <div className="journal-entries">
      {currentUser !== null ? 
          (
          <div>
            {entries.length > 0 ? 
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
          </div>
          ):(
            <div>
              <h4>Log in to View Journal Entries</h4>
            </div>
          )}
      </div>
    </div>
  );
};

export default JournalsSearch;

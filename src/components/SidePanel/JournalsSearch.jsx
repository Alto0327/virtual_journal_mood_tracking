import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import useJournal from "../../Hooks/useJournal";

const JournalsSearch = ({curEntry, setCurEntry}) => {
const { currentUser } = useContext(UserContext)
const { entries } = useJournal()

  const handle_set_entry = (entry) =>{
    setCurEntry(entry)
  }
  console.log(curEntry)
  return (
    <div className="journal-container">
      <form>
        <label>
          <h4>Search Journal</h4>
          <p>{curEntry ? curEntry.title : "No entry selected"}</p>
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
                      <button key={entry.id} onClick={() => handle_set_entry(entry)}>
                        <h3>{entry.title}</h3>
                        <small>{new Date(entry.date).toLocaleDateString()}</small>
                      </button>
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

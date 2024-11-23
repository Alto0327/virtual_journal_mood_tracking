import { useEffect, useState } from 'react';
import useJournal from '../../Hooks/useJournal';

const JournalsSearch = () => {
  const { entries, updateJournalEntry, deleteJournalEntry } = useJournal();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredEntries, setFilteredEntries] = useState(entries); 

  useEffect(() => {
    if (!searchTerm) {
      setFilteredEntries(entries);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      setFilteredEntries(
        entries.filter(
          (entry) =>
            entry.title.toLowerCase().includes(lowercasedSearchTerm) ||
            entry.content.toLowerCase().includes(lowercasedSearchTerm) ||
            new Date(entry.date).toLocaleDateString().includes(lowercasedSearchTerm)
        )
      );
    }
  }, [entries, searchTerm]);

  return (
    <div className="journal-container">
      <form>
        <label>
          <h4>Search Journal</h4>
        </label>
        <input
          type="text"
          placeholder="By Date or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </form>
      <div className="journal-entries">
        <ul>
          {filteredEntries.map((entry) => (
            <li key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <small>{new Date(entry.date).toLocaleDateString()}</small>
              <button onClick={() => deleteJournalEntry(entry.id)}>Delete</button>
              <button
                onClick={() =>
                  updateJournalEntry(entry.id, { title: 'Updated Title', content: 'Updated Content' })
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JournalsSearch;

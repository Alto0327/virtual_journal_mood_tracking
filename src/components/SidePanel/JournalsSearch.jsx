const JournalsSearch= ({notes}) =>{
    return(
        <div className="journal-container">
            <form>
                <label>
                    <h4>Search Journal</h4>
                </label>
                    <input 
                        type="text"
                        placeholder="By Date or Name"    
                    />
            </form>
            <div className="journal-entries">
                <p>Journals will be here</p>
                {notes.map((note, index) =>(
                    <div key={index}> {note.title} </div>
                ))}
            </div>
        </div>
    )
}

export default JournalsSearch
const JournalsSearch= () =>{
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
            </div>
        </div>
    )
}

export default JournalsSearch
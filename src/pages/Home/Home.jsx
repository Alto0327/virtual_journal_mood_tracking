import { useState, useEffect } from 'react'
import './Home.css' 

function Home({onSave}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [lastSavedNote, setLastSavedNote] = useState({ title: '',content: ''})

    useEffect(() => {
        const handleAutoSave = setTimeout(() =>{
            if((title || content) && (title !== lastSavedNote.title || content !== lastSavedNote.content)){
                onSave({title, content})
                setLastSavedNote({title,content})
            }
        },2000)
        console.log("new save")
        return () => clearTimeout(handleAutoSave)
    }, [content, title, onSave])

    return (
        <div className='Home'>
            <input 
                type="text" 
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder='Journaling goes here'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
        </div>
    )
}

export default Home
import { useState, useEffect, useContext } from 'react'
import './Home.css' 
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'


function Main() {
  const { currentUser } = useContext(UserContext)  

  return (
    <div>
      {currentUser !== null ? 
        (
          <div>
            <h1>Welcome in</h1>
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

export default Main
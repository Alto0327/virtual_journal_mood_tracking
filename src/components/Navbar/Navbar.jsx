import { Outlet, Link } from "react-router-dom";
import './Navbar.css'
import UserContext from "../../context/UserContext";
import { useContext } from "react";

function Navbar() {
    const { currentUser } = useContext(UserContext)

    return (
        <nav className="Navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/chart">Chart</Link>
                </li>
                <li>
                    <Link to="/init">Login</Link>
                </li>
            </ul>
            <h1>            {currentUser ? (
                <div>
                    <p>Welcome, {currentUser.displayName || currentUser.email}</p>
                </div>
            ) : (
                <p>Please log in</p>
            )}</h1>
            <Outlet />
        </nav>
    )
}

export default Navbar
import './Navbar.css'
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import useAuthentication from "../../Hooks/useAuthentication";
import { useContext } from "react";

function Navbar() {
    const { currentUser } = useContext(UserContext)
    const { logout,loading} = useAuthentication()




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
                    <p>Welcome, {currentUser.email}</p>
                    <button onClick={logout} disabled={loading}>
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            ) : (
                <p>Please log in</p>
            )}</h1>
            <Outlet />
        </nav>
    )
}

export default Navbar
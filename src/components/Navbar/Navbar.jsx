import Authentication from "../../pages/Login-Signup/Authentication"
import { Outlet, Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <div className="Navbar">
        <nav>
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
        </nav>
            <Outlet />
        </div>
    )
}

export default Navbar
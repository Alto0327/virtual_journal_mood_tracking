import Authentication from "../../pages/Login-Signup/Authentication"
import { Outlet, Link } from "react-router-dom";
import Logo from "../../assets/Logo-White.png"
import './Navbar.css'

function Navbar() {
    return (
        <>
        <nav>
            <img src={Logo} alt="" width="60px" />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/init">Login</Link>
                </li>
            </ul>
        </nav>
            <Outlet />
        </>
    )
}

export default Navbar
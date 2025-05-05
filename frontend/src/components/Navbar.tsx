import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <div className={`navbar shadow-lg`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>HabitForge</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="btn btn-ghost">Home</Link></li>
                    <li><Link to="/about" className="btn btn-ghost">About</Link></li>
                    <li><Link to="/login" className="btn btn-ghost">Login</Link></li>
                    <li><Link to="/signup" className="btn btn-ghost">Sign Up</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex justify-end border-2 rounded-full mr-2">
                    <ThemeToggle />
                </div>
                <Link to="/signup" className="btn btn-primary text-white">Get Started</Link>
            </div>
        </div>
    );
};

export default Navbar; 
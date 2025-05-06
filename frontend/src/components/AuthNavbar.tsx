import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

interface User {
    id: number;
    username: string;
    email: string;
}

const AuthNavbar = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            {/* Logo */}
            <div className="flex-1">
                <Link to="/app" className="navbar-logo">
                    <img src="src/assets/logo-hf.svg" alt="HabitForge" className="" />
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-none hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/app" className="font-medium">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/streaks" className="font-medium">
                            Streaks
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/feed" className="font-medium">
                            Feed
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/rewards" className="font-medium">
                            Rewards & Badges
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Right Side Items */}
            <div className="flex-none gap-2">
                {/* Theme Toggle */}
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    )}
                </button>

                {/* User Avatar Dropdown */}
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                        onClick={toggleDropdown}
                        aria-label="User menu"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                                alt={user?.username}
                            />
                        </div>
                    </button>
                    {isDropdownOpen && (
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthNavbar; 
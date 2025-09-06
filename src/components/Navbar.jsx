import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Cart count
    const cartCount = useSelector((state) => state.cart.items.length);

    // Load user
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate("/login");
    };

    // Dark mode toggle with persistence
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Light mode background (gray) and dark mode (black)
    const navBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black";
    const mobileBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black";

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-colors duration-500 ${navBg}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
                {/* Logo */}
                <Link to="/" className={`text-2xl font-bold tracking-wide ${theme === "dark" ? "text-yellow-400" : "text-black"}`}>
                    🚗 FastLane
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center text-lg">
                    {["Home", "Search", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className={`hover:text-gray-700 dark:hover:text-yellow-400 transition`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                    <li className="relative">
                        <Link
                            to="/cart"
                            className="hover:text-gray-700 dark:hover:text-yellow-400 transition"
                        >
                            🛒 Cart
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </li>
                    <li>
                        <Link
                            to="/wishlist"
                            className="hover:text-gray-700 dark:hover:text-yellow-400 transition"
                        >
                            ❤️ Wishlist
                        </Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-medium">{`Hello, ${loggedInUser.name}`}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400 transition"
                        >
                            Login
                        </Link>
                    )}

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleTheme}
                        className="ml-4 px-3 py-1 rounded-lg bg-gray-300 text-black dark:bg-gray-700 dark:text-white transition"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-3xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <ul
                    className={`flex flex-col gap-4 mt-4 md:hidden p-6 rounded-lg shadow-md transition-colors duration-500 ${mobileBg}`}
                >
                    {["Home", "Search", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item.toLowerCase()}`}
                                className="hover:text-gray-700 dark:hover:text-yellow-400"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                    <li className="relative">
                        <Link
                            to="/cart"
                            className="hover:text-gray-700 dark:hover:text-yellow-400"
                        >
                            🛒 Cart
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute top-0 left-16 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </li>
                    <li>
                        <Link
                            to="/wishlist"
                            className="hover:text-gray-700 dark:hover:text-yellow-400"
                        >
                            ❤️ Wishlist
                        </Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-medium">{`Hello, ${loggedInUser.name}`}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400 transition"
                        >
                            Login
                        </Link>
                    )}

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleTheme}
                        className="mt-2 px-3 py-1 rounded-lg bg-gray-300 text-black dark:bg-gray-700 dark:text-white transition"
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

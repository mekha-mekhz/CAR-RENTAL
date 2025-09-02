import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Get cart count from Redux
    const cartCount = useSelector((state) => state.cart.items.length);

    // Load logged-in user from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md text-white px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide text-yellow-400">
                    🚗 FastLane
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center text-lg">
                    <li>
                        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-yellow-400 transition">Search</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
                    </li>
                    <li className="relative">
                        <Link to="/cart" className="hover:text-yellow-400 transition">
                            🛒 Cart
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </li>
                    <li>
                        <Link to="/wishlist" className="hover:text-yellow-400 transition">❤️ Wishlist</Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-medium">Hello, {loggedInUser.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-yellow-400 text-black px-4 py-1 rounded-lg hover:bg-yellow-500 transition"
                        >
                            Login
                        </Link>
                    )}
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
                <ul className="flex flex-col gap-4 mt-4 md:hidden bg-black/90 text-white p-6 rounded-lg shadow-md">
                    <li>
                        <Link to="/" className="hover:text-yellow-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-yellow-400">Search</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-yellow-400">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
                    </li>
                    <li className="relative">
                        <Link to="/cart" className="hover:text-yellow-400">
                            🛒 Cart
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute top-0 left-16 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </li>
                    <li>
                        <Link to="/wishlist" className="hover:text-yellow-400">❤️ Wishlist</Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-medium">Hello, {loggedInUser.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-yellow-400 text-black px-4 py-1 rounded-lg hover:bg-yellow-500"
                        >
                            Login
                        </Link>
                    )}
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Get cart count from Redux
    const cartCount = useSelector((state) => state.cart.items.length);

    // Load logged-in user
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
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    🚗 CarRental
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center text-lg font-medium">
                    <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
                    <li><Link to="/search" className="hover:text-yellow-400 transition">Search</Link></li>
                    <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
                    <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>

                    {/* Cart */}
                    <li className="relative">
                        <Link to="/cart" className="hover:text-yellow-400 transition">
                            🛒 Cart
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </li>

                    <li><Link to="/wishlist" className="hover:text-yellow-400 transition">❤️ Wishlist</Link></li>

                    {/* User / Login */}
                    {loggedInUser ? (
                        <>
                            <span className="font-semibold">Hi, {loggedInUser.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition"
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
                <ul className="flex flex-col gap-4 mt-4 md:hidden bg-gray-900 p-6 rounded-lg shadow-lg text-lg">
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/search" onClick={() => setIsOpen(false)}>Search</Link></li>
                    <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                    <li><Link to="/wishlist" onClick={() => setIsOpen(false)}>❤️ Wishlist</Link></li>
                    <li><Link to="/cart" onClick={() => setIsOpen(false)}>🛒 Cart</Link></li>

                    {loggedInUser ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-lg font-semibold"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-lg font-semibold"
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

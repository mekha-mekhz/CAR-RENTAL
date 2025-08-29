import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
        <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">Car Rental</Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 items-center">
                    <li>
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-gray-200">Search</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-gray-200">Cart</Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="hover:text-gray-200">Wishlist</Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-semibold">Hello, {loggedInUser.name}</span>
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <ul className="flex flex-col gap-3 mt-3 md:hidden bg-blue-700 p-4 rounded-lg">
                    <li>
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-gray-200">Search</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-gray-200">Cart</Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="hover:text-gray-200">Wishlist</Link>
                    </li>

                    {loggedInUser ? (
                        <>
                            <span className="font-semibold">Hello, {loggedInUser.name}</span>
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

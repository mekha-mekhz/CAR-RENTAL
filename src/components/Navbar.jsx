// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow-md">
//             {/* Brand / Logo */}
//             <div className="text-2xl font-bold">
//                 <Link to="/">🚗 CarRental</Link>
//             </div>

//             {/* Nav Links */}
//             <div className="flex items-center space-x-6 text-lg">
//                 <Link to="/" className="hover:text-yellow-300">HOME</Link>
//                 <Link to="/about" className="hover:text-yellow-300">ABOUT</Link>
//                 <Link to="/search" className="hover:text-yellow-300">CARS</Link>
//                 <Link to="/contact" className="hover:text-yellow-300">CONTACT</Link>
//                 <Link
//                     to="/login"
//                     className="bg-yellow-400 text-black px-4 py-1 rounded-lg hover:bg-yellow-500"
//                 >
//                     LOGIN
//                 </Link>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    Car Rental
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6">
                    <li>
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-gray-200">About</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-gray-200">Search</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-200">Login</Link>
                    </li>
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
                        <Link to="/about" className="hover:text-gray-200">About</Link>
                    </li>
                    <li>
                        <Link to="/search" className="hover:text-gray-200">Search</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-200">Login</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

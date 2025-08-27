import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow-md">
                {/* Brand / Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/">🚗 CarRental</Link>
                </div>

                {/* Nav Links */}
                <div className="flex space-x-6 text-lg">
                    <Link to="/" className="hover:text-yellow-300">HOME</Link>
                    <Link to="/about" className="hover:text-yellow-300">ABOUT</Link>
                    <Link to="/cars" className="hover:text-yellow-300">CARS</Link>
                    <Link to="/contact" className="hover:text-yellow-300">CONTACT</Link>
                    <Link to="/login"
                        className="bg-yellow-400 text-black px-4 py-1 rounded-lg hover:bg-yellow-500"
                    >
                        LOGIN
                    </Link>
                </div>
            </nav>

            {/* Pages render here */}

        </>
    );
}

export default Navbar;

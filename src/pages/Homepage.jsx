import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div
            className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/homepage.jpg')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Welcome to <span className="text-yellow-400">CarRental</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    Rent your dream car today. Affordable, reliable, and available anytime you need.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/cars"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition"
                    >
                        Browse Cars
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Homepage;

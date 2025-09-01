import React from "react";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg')`, // car bg
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Card */}
            <div className="relative bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md text-center backdrop-blur-sm">
                <h1 className="text-3xl font-extrabold text-blue-700 mb-6 drop-shadow-md">
                    Choose Registration Type
                </h1>

                <Link
                    to="/register-customer"
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform mb-4 shadow-md"
                >
                    Register as Customer
                </Link>

                <Link
                    to="/register-agency"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform shadow-md"
                >
                    Register as Rental Agency
                </Link>
            </div>
        </div>
    );
}

export default Register;

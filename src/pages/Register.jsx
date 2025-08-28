import React from "react";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">
                    Choose Registration Type
                </h1>

                <Link
                    to="/register-customer"
                    className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4"
                >
                    Register as Customer
                </Link>

                <Link
                    to="/register-agency"
                    className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                    Register as Rental Agency
                </Link>
            </div>
        </div>
    );
}

export default Register;

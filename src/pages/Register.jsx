import React from "react";

function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>

                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mb-1">Second Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>-- Select Role --</option>
                    <option>Rental Agency</option>
                    <option>Customer</option>
                </select>

                <label className="block text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

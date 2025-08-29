import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser || loggedInUser.role !== "customer") {
            navigate("/login"); // redirect if not logged in
        } else {
            setUser(loggedInUser);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link
                    to="/my-bookings"
                    className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
                >
                    My Bookings
                </Link>
                <Link
                    to="/cart"
                    className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
                >
                    Cart
                </Link>
                <Link
                    to="/wishlist"
                    className="bg-yellow-500 text-black p-6 rounded-lg shadow hover:bg-yellow-600 text-center"
                >
                    Wishlist
                </Link>
            </div>
        </div>
    );
}

export default CustomerDashboard;

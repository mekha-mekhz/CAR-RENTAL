import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
    const [customer, setCustomer] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch logged-in user details
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setCustomer(user);

        // Fetch cart, wishlist, and bookings
        setCart(JSON.parse(localStorage.getItem("customerCart")) || []);
        setWishlist(JSON.parse(localStorage.getItem("customerWishlist")) || []);
        setBookings(JSON.parse(localStorage.getItem("customerBookings")) || []);
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Customer Info */}
            {customer && (
                <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Hello, {customer.name} 👋</h1>
                        <p className="text-gray-700">{customer.email}</p>
                    </div>
                    <button
                        onClick={() => navigate("/search")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        🔍 Book a New Car
                    </button>
                </div>
            )}

            {/* Bookings */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">✅ My Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="text-gray-500">You have no bookings yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {bookings.map((b) => (
                            <li
                                key={b.bookingId}
                                className="border p-4 rounded-lg bg-green-50 shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">{b.name}</p>
                                    <p className="text-gray-700">{b.type}</p>
                                    <p className="text-gray-700">Price: ₹{b.price} / day</p>
                                    <p className="text-gray-500 text-sm">Booked on: {b.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Cart */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">🛒 My Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">No items in your cart.</p>
                ) : (
                    <ul className="space-y-3">
                        {cart.map((c) => (
                            <li key={c.id} className="border p-3 rounded-lg bg-gray-50 shadow">
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-gray-700">Price: ₹{c.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Wishlist */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">💖 My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p className="text-gray-500">No items in your wishlist.</p>
                ) : (
                    <ul className="space-y-3">
                        {wishlist.map((w) => (
                            <li key={w.id} className="border p-3 rounded-lg bg-pink-50 shadow">
                                <p className="font-semibold">{w.name}</p>
                                <p className="text-gray-700">Price: ₹{w.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default CustomerDashboard;

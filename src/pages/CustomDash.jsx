import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const approved = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
        setVehicles(approved);

        setCart(JSON.parse(localStorage.getItem("customerCart")) || []);
        setWishlist(JSON.parse(localStorage.getItem("customerWishlist")) || []);
        setBookings(JSON.parse(localStorage.getItem("customerBookings")) || []);
    }, []);

    // --- Cart ---
    const addToCart = (vehicle) => {
        if (cart.find((item) => item.id === vehicle.id)) {
            alert("Already in cart!");
            return;
        }
        const updated = [...cart, vehicle];
        setCart(updated);
        localStorage.setItem("customerCart", JSON.stringify(updated));
    };

    // --- Wishlist ---
    const addToWishlist = (vehicle) => {
        if (wishlist.find((item) => item.id === vehicle.id)) {
            alert("Already in wishlist!");
            return;
        }
        const updated = [...wishlist, vehicle];
        setWishlist(updated);
        localStorage.setItem("customerWishlist", JSON.stringify(updated));
    };

    // --- Booking ---
    const handleBook = (vehicle) => {
        const newBooking = {
            ...vehicle,
            bookingId: Date.now(),
            date: new Date().toLocaleString(),
        };
        const updated = [...bookings, newBooking];
        setBookings(updated);
        localStorage.setItem("customerBookings", JSON.stringify(updated));
        alert(`✅ Booked ${vehicle.name} successfully`);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">🚗 Customer Dashboard</h1>
                <button
                    onClick={() => navigate("/search")}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    🔍 Book a New Car
                </button>
            </div>

            {/* Available Vehicles */}
            <h2 className="text-xl font-semibold mb-3">Available Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                    <div key={v.id} className="border p-4 rounded-lg shadow">
                        <img
                            src={v.image}
                            alt={v.name}
                            className="w-full h-40 object-cover mb-2 rounded"
                        />
                        <h3 className="font-bold">{v.name}</h3>
                        <p>Type: {v.type}</p>
                        <p>Price: ₹{v.price} / day</p>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => addToCart(v)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => addToWishlist(v)}
                                className="bg-pink-500 text-white px-3 py-1 rounded"
                            >
                                Wishlist
                            </button>
                        </div>
                        <button
                            onClick={() => handleBook(v)}
                            className="bg-blue-600 text-white px-4 py-2 mt-2 w-full rounded"
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Cart */}
            <h2 className="text-xl font-semibold mt-10 mb-3">🛒 My Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <ul className="space-y-3">
                    {cart.map((c) => (
                        <li key={c.id} className="border p-3 rounded bg-gray-50">
                            {c.name} - ₹{c.price}
                        </li>
                    ))}
                </ul>
            )}

            {/* Wishlist */}
            <h2 className="text-xl font-semibold mt-10 mb-3">💖 My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No items in wishlist.</p>
            ) : (
                <ul className="space-y-3">
                    {wishlist.map((w) => (
                        <li key={w.id} className="border p-3 rounded bg-gray-50">
                            {w.name} - ₹{w.price}
                        </li>
                    ))}
                </ul>
            )}

            {/* Bookings */}
            <h2 className="text-xl font-semibold mt-10 mb-3">✅ My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <ul className="space-y-3">
                    {bookings.map((b) => (
                        <li
                            key={b.bookingId}
                            className="border p-3 rounded bg-green-50 shadow"
                        >
                            <strong>{b.name}</strong> - {b.type} <br />
                            Price: ₹{b.price} / day <br />
                            Booked on: {b.date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomerDashboard;

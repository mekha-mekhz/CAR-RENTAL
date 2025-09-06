import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
    const [customer, setCustomer] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Feedback form state
    const [feedbackForm, setFeedbackForm] = useState({
        stars: 0,
        feedback: "",
        photo: null,
    });

    // Complaint form state
    const [complaintForm, setComplaintForm] = useState({
        bookingPDF: null,
        travelDate: "",
        vehicle: "",
        complaint: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setCustomer(user);

        setCart(JSON.parse(localStorage.getItem("customerCart")) || []);
        setWishlist(JSON.parse(localStorage.getItem("customerWishlist")) || []);
        setBookings(JSON.parse(localStorage.getItem("customerBookings")) || []);
    }, []);

    // Feedback handlers
    const handleFeedbackChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFeedbackForm({ ...feedbackForm, [name]: files[0] });
        } else {
            setFeedbackForm({ ...feedbackForm, [name]: value });
        }
    };

    const handleStarClick = (rating) => {
        setFeedbackForm({ ...feedbackForm, stars: rating });
    };

    const submitFeedback = (e) => {
        e.preventDefault();
        if (!feedbackForm.feedback) {
            alert("Please enter feedback!");
            return;
        }
        const feedbacks = JSON.parse(localStorage.getItem("pendingFeedbacks")) || [];
        feedbacks.push({
            id: Date.now(),
            user: customer?.name || "Anonymous",
            stars: feedbackForm.stars,
            feedback: feedbackForm.feedback,
            photo: feedbackForm.photo ? URL.createObjectURL(feedbackForm.photo) : null,
            status: "pending",
        });
        localStorage.setItem("pendingFeedbacks", JSON.stringify(feedbacks));
        alert("✅ Feedback submitted for admin review!");
        setFeedbackForm({ stars: 0, feedback: "", photo: null });
    };

    // Complaint handlers
    const handleComplaintChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setComplaintForm({ ...complaintForm, [name]: files[0] });
        } else {
            setComplaintForm({ ...complaintForm, [name]: value });
        }
    };

    const submitComplaint = (e) => {
        e.preventDefault();
        if (!complaintForm.complaint) {
            alert("Please enter your complaint!");
            return;
        }
        const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.push({
            id: Date.now(),
            user: customer?.name || "Anonymous",
            bookingPDF: complaintForm.bookingPDF ? URL.createObjectURL(complaintForm.bookingPDF) : null,
            travelDate: complaintForm.travelDate,
            vehicle: complaintForm.vehicle,
            complaint: complaintForm.complaint,
            status: "new",
        });
        localStorage.setItem("complaints", JSON.stringify(complaints));
        alert("⚠️ Complaint submitted to admin!");
        setComplaintForm({ bookingPDF: null, travelDate: "", vehicle: "", complaint: "" });
    };

    // Cancel booking
    const cancelBooking = (bookingId, startDate) => {
        const today = new Date();
        const travelDate = new Date(startDate);
        const diffDays = Math.ceil((travelDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 5) {
            alert("❌ You can only cancel bookings at least 5 days in advance.");
            return;
        }
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            const updatedBookings = bookings.filter((b) => b.bookingId !== bookingId);
            setBookings(updatedBookings);
            localStorage.setItem("customerBookings", JSON.stringify(updatedBookings));
            alert("✅ Booking cancelled successfully!");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500">
            {/* Customer Info */}
            {customer && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center transition-colors duration-500">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Hello, {customer.name} 👋
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300">{customer.email}</p>
                    </div>
                    <button
                        onClick={() => navigate("/search")}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
                    >
                        🔍 Book a New Car
                    </button>
                </div>
            )}

            {/* Bookings */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">✅ My Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">You have no bookings yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {bookings.map((b) => {
                            const today = new Date();
                            const travelDate = new Date(b.startDate);
                            const diffDays = Math.ceil((travelDate - today) / (1000 * 60 * 60 * 24));
                            const canCancel = diffDays > 5;

                            return (
                                <li key={b.bookingId} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-green-50 dark:bg-green-900/40 shadow flex justify-between items-center transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{b.car?.name || "Unknown Vehicle"}</p>
                                        <p className="text-gray-700 dark:text-gray-300">{b.car?.type || b.car?.model || "Unknown Type"}</p>
                                        <p className="text-gray-700 dark:text-gray-300">Price: ₹{b.totalPrice}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Travel: {b.startDate} → {b.endDate}</p>
                                    </div>
                                    <button
                                        onClick={() => cancelBooking(b.bookingId, b.startDate)}
                                        disabled={!canCancel}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold ${canCancel ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
                                    >
                                        Cancel
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            {/* Cart */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">🛒 My Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No items in your cart.</p>
                ) : (
                    <ul className="space-y-3">
                        {cart.map((c) => (
                            <li key={c.id} className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow transition-colors">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                                <p className="text-gray-700 dark:text-gray-300">Price: ₹{c.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Wishlist */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">💖 My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No items in your wishlist.</p>
                ) : (
                    <ul className="space-y-3">
                        {wishlist.map((w) => (
                            <li key={w.id} className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg bg-pink-50 dark:bg-pink-900/40 shadow transition-colors">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">{w.name}</p>
                                <p className="text-gray-700 dark:text-gray-300">Price: ₹{w.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Feedback Form */}
            <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">⭐ Leave Feedback</h2>
                <form onSubmit={submitFeedback} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Rating:</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`cursor-pointer text-2xl ${feedbackForm.stars >= star ? "text-yellow-400" : "text-gray-400"}`} onClick={() => handleStarClick(star)}>★</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Profile Photo:</label>
                        <input type="file" name="photo" accept="image/*" onChange={handleFeedbackChange} />
                    </div>

                    <div>
                        <textarea name="feedback" value={feedbackForm.feedback} onChange={handleFeedbackChange} placeholder="Write your feedback..." className="w-full p-3 h-24 border rounded-lg dark:bg-gray-800 dark:text-gray-100" required />
                    </div>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">Submit Feedback</button>
                </form>
            </section>

            {/* Complaint Form */}
            <section className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">⚠️ Raise a Complaint</h2>
                <form onSubmit={submitComplaint} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Booking Summary (PDF):</label>
                        <input type="file" name="bookingPDF" accept="application/pdf" onChange={handleComplaintChange} />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Date of Travel:</label>
                        <input type="date" name="travelDate" value={complaintForm.travelDate} onChange={handleComplaintChange} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-gray-100" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Vehicle Name:</label>
                        <input type="text" name="vehicle" value={complaintForm.vehicle} onChange={handleComplaintChange} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-gray-100" placeholder="Vehicle" required />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Complaint Details:</label>
                        <textarea name="complaint" value={complaintForm.complaint} onChange={handleComplaintChange} placeholder="Describe your issue..." className="w-full p-3 h-24 border rounded-lg dark:bg-gray-800 dark:text-gray-100" required />
                    </div>

                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow">Submit Complaint</button>
                </form>
            </section>
        </div>
    );
}

export default CustomerDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookingForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCar = location.state; // Car passed from Filter page

    const [form, setForm] = useState({
        name: "",
        email: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        if (!selectedCar) {
            navigate("/search"); // Redirect if no car selected
        }
    }, [selectedCar, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.startDate || !form.endDate) {
            alert("Please fill all fields!");
            return;
        }

        sessionStorage.setItem(
            "latestBooking",
            JSON.stringify({ ...form, car: selectedCar })
        );

        navigate("/booking-summary");
    };

    if (!selectedCar) return null;

    return (
        <div className="flex justify-center items-start md:items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Booking: {selectedCar.name}
                </h1>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Start Date</label>
                        <input
                            name="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">End Date</label>
                        <input
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;

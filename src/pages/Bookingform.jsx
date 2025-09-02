import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookingForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCar = location.state; // Car passed from Filter page

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        deliveryType: "Self Pickup",
        driverOption: "Without Driver",
        location: "",
        startDate: "",
        endDate: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [numDays, setNumDays] = useState(0);

    useEffect(() => {
        if (!selectedCar) {
            navigate("/search"); // Redirect if no car selected
        } else {
            // Set default location from admin or JSON
            setForm(prev => ({
                ...prev,
                location: selectedCar.location || selectedCar.locations?.[0]?.name || "",
            }));
        }
    }, [selectedCar, navigate]);

    // Calculate total price
    useEffect(() => {
        if (form.startDate && form.endDate) {
            const start = new Date(form.startDate);
            const end = new Date(form.endDate);
            const diffTime = end - start;
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setNumDays(days);

            let basePrice = days * (selectedCar?.price || 0);
            if (form.driverOption === "With Driver") {
                basePrice += 1000; // Extra charge
            }
            setTotalPrice(basePrice);
        }
    }, [form.startDate, form.endDate, form.driverOption, selectedCar]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate dates
        if ((name === "startDate" || name === "endDate") && value < today) {
            alert("Date cannot be in the past!");
            return;
        }
        if (name === "endDate" && form.startDate && value < form.startDate) {
            alert("End date cannot be before start date!");
            return;
        }

        // Driver option changes delivery type
        if (name === "driverOption" && value === "With Driver") {
            setForm(prev => ({ ...prev, driverOption: value, deliveryType: "We Will Pick" }));
        } else if (name === "driverOption") {
            setForm(prev => ({ ...prev, driverOption: value, deliveryType: "Self Pickup" }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.startDate || !form.endDate || !form.location) {
            alert("Please fill all required fields!");
            return;
        }

        sessionStorage.setItem(
            "latestBooking",
            JSON.stringify({ ...form, car: selectedCar, totalPrice, numDays })
        );

        navigate("/booking-summary");
    };

    if (!selectedCar) return null;

    return (
        <div className="flex justify-center items-start md:items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg transition-colors duration-300"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                    Booking: {selectedCar.name || selectedCar.model}
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />

                    <label className="block text-gray-700 dark:text-gray-300">Driver Option:</label>
                    <select
                        name="driverOption"
                        value={form.driverOption}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                        <option>Without Driver</option>
                        <option>With Driver</option>
                    </select>

                    <label className="block text-gray-700 dark:text-gray-300">Delivery Type:</label>
                    <input
                        type="text"
                        name="deliveryType"
                        value={form.deliveryType}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
                    />

                    <label className="block text-gray-700 dark:text-gray-300">Select Location:</label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                        <option value="">Select Location</option>
                        {selectedCar.location && <option value={selectedCar.location}>{selectedCar.location}</option>}
                        {selectedCar.locations?.map(loc => (
                            <option key={loc.name} value={loc.name}>{loc.name}</option>
                        ))}
                    </select>

                    <label className="block text-gray-700 dark:text-gray-300">Start Date:</label>
                    <input
                        name="startDate"
                        type="date"
                        value={form.startDate}
                        min={today}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />

                    <label className="block text-gray-700 dark:text-gray-300">End Date:</label>
                    <input
                        name="endDate"
                        type="date"
                        value={form.endDate}
                        min={form.startDate || today}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />

                    <p className="text-center font-semibold text-gray-900 dark:text-white mt-2">
                        Total Price: ₹{totalPrice} ({numDays} {numDays === 1 ? "day" : "days"})
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 mt-2 transition-colors duration-300"
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookingForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCar = location.state;

    const today = new Date().toISOString().split("T")[0];

    const sevenDistricts = ["Kochi", "Thiruvananthapuram", "Palakkad", "Kottayam", "Kasaragod", "Wayanad"];
    const fourteenDistricts = ["Kochi", "Thiruvananthapuram", "Palakkad", "Kottayam", "Kasaragod", "Wayanad", "Ernakulam", "Thrissur", "Malappuram", "Idukki", "Kannur", "Alappuzha", "Pathanamthitta", "Kollam"];

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        deliveryType: "Self Pickup",
        driverOption: "Without Driver",
        pickupLocation: "",
        dropoffLocation: "",
        startDate: "",
        endDate: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [numDays, setNumDays] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!selectedCar) {
            navigate("/search");
        } else {
            setForm((prev) => ({
                ...prev,
                pickupLocation: selectedCar.location || selectedCar.locations?.[0]?.name || "",
            }));
        }
    }, [selectedCar, navigate]);

    useEffect(() => {
        if (form.startDate && form.endDate) {
            const start = new Date(form.startDate);
            const end = new Date(form.endDate);
            const diffTime = end - start;
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setNumDays(days);

            let basePrice = days * (selectedCar?.price || 0);
            if (form.driverOption === "With Driver") basePrice += 1000;
            setTotalPrice(basePrice);
        }
    }, [form.startDate, form.endDate, form.driverOption, selectedCar]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "startDate" || name === "endDate") && value < today) {
            alert("Date cannot be in the past!");
            return;
        }
        if (name === "endDate" && form.startDate && value < form.startDate) {
            alert("End date cannot be before start date!");
            return;
        }

        if (name === "driverOption" && value === "With Driver") {
            setForm((prev) => ({
                ...prev,
                driverOption: value,
                deliveryType: "We Will Pick",
                pickupLocation: "",
            }));
        } else if (name === "driverOption") {
            setForm((prev) => ({
                ...prev,
                driverOption: value,
                deliveryType: "Self Pickup",
                pickupLocation: "",
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.name ||
            !form.email ||
            !form.startDate ||
            !form.endDate ||
            !form.pickupLocation ||
            !form.dropoffLocation
        ) {
            alert("Please fill all required fields!");
            return;
        }

        const bookingData = {
            ...form,
            car: selectedCar,
            totalPrice,
            numDays,
            bookingId: Date.now(),
        };

        const customerBookings = JSON.parse(localStorage.getItem("customerBookings")) || [];
        customerBookings.push(bookingData);
        localStorage.setItem("customerBookings", JSON.stringify(customerBookings));

        const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        allBookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(allBookings));

        sessionStorage.setItem("latestBooking", JSON.stringify(bookingData));

        setSuccessMessage("✅ Booking submitted successfully! Booking summary will be sent to your email.");

        setTimeout(() => navigate("/booking-summary"), 2000);
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
                    <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />

                    <label className="text-gray-800 dark:text-gray-200">Driver Option:</label>
                    <select name="driverOption" value={form.driverOption} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>Without Driver</option>
                        <option>With Driver</option>
                    </select>

                    <label className="text-gray-800 dark:text-gray-200">Delivery Type:</label>
                    <input type="text" name="deliveryType" value={form.deliveryType} readOnly className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white" />

                    {form.deliveryType === "Self Pickup" && (
                        <>
                            <label className="text-gray-800 dark:text-gray-200">Select Pickup District:</label>
                            <select
                                name="pickupLocation"
                                value={form.pickupLocation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Select District</option>
                                {sevenDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {form.deliveryType === "We Will Pick" && (
                        <>
                            <label className="text-gray-800 dark:text-gray-200">Select Pickup District:</label>
                            <select
                                name="pickupLocation"
                                value={form.pickupLocation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Select District</option>
                                {fourteenDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <label className="text-gray-800 dark:text-gray-200">Drop-off Location:</label>
                    <input name="dropoffLocation" type="text" placeholder="Enter Drop-off Location" value={form.dropoffLocation} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />

                    <label className="text-gray-800 dark:text-gray-200">Start Date:</label>
                    <input name="startDate" type="date" value={form.startDate} min={today} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />

                    <label className="text-gray-800 dark:text-gray-200">End Date:</label>
                    <input name="endDate" type="date" value={form.endDate} min={form.startDate || today} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />

                    <p className="text-center font-semibold mt-2 text-gray-900 dark:text-gray-100">
                        Total Price: ₹{totalPrice} ({numDays} {numDays === 1 ? "day" : "days"})
                    </p>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">
                        Book Now
                    </button>

                    {successMessage && (
                        <p className="mt-4 text-green-500 font-semibold text-center">
                            {successMessage}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default BookingForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookingForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCar = location.state; // Car passed from Filter page

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
        }
    }, [selectedCar, navigate]);

    // Calculate total whenever dates change
    useEffect(() => {
        if (form.startDate && form.endDate) {
            const start = new Date(form.startDate);
            const end = new Date(form.endDate);
            const diffTime = end - start;

            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setNumDays(days);
            setTotalPrice(days * (selectedCar?.price || 0));
        }
    }, [form.startDate, form.endDate, selectedCar]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Driver option changes delivery type automatically
        if (name === "driverOption" && value === "With Driver") {
            setForm((prev) => ({ ...prev, driverOption: value, deliveryType: "We Will Pick" }));
        } else if (name === "driverOption") {
            setForm((prev) => ({ ...prev, driverOption: value, deliveryType: "Self Pickup" }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
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
        <div className="flex justify-center items-start md:items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Booking: {selectedCar.name || selectedCar.model}
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    <label className="block">Driver Option:</label>
                    <select
                        name="driverOption"
                        value={form.driverOption}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option>Without Driver</option>
                        <option>With Driver</option>
                    </select>

                    <label className="block">Delivery Type:</label>
                    <input
                        type="text"
                        name="deliveryType"
                        value={form.deliveryType}
                        readOnly
                        className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                    />

                    <label className="block">Select Location:</label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">Select Location</option>
                        {selectedCar.locations?.map((loc) => (
                            <option key={loc.name} value={loc.name}>
                                {loc.name}
                            </option>
                        ))}
                    </select>

                    <label className="block">Start Date:</label>
                    <input
                        name="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    <label className="block">End Date:</label>
                    <input
                        name="endDate"
                        type="date"
                        value={form.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    <p className="text-center font-semibold mt-2">
                        Total Price: ${totalPrice} ({numDays} {numDays === 1 ? "day" : "days"})
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2"
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;

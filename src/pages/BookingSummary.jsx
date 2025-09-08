import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingSummary() {
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const latestBooking = JSON.parse(sessionStorage.getItem("latestBooking"));
        if (latestBooking) {
            setBooking(latestBooking);
        } else {
            navigate("/search"); // Redirect if no booking exists
        }
    }, [navigate]);

    if (!booking) return null; // Waiting for data

    const {
        name,
        email,
        phone,
        driverOption,
        deliveryType,
        pickupLocation,
        dropoffLocation,
        startDate,
        endDate,
        numDays,
        totalPrice,
        car,
    } = booking;

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
            <div className="max-w-lg w-full bg-gray-900 text-white shadow-lg rounded-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-400">
                    Booking Summary ✅
                </h1>

                <h2 className="text-xl font-semibold mb-2 text-blue-400">Car Details</h2>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Brand:</strong> {car.brand}</p>
                <p><strong>Price per Day:</strong> ${car.price}</p>

                <h2 className="text-xl font-semibold mt-4 mb-2 text-blue-400">Your Details</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Driver Option:</strong> {driverOption}</p>
                <p><strong>Delivery Type:</strong> {deliveryType}</p>
                <p><strong>Pickup Location:</strong> {pickupLocation}</p>
                <p><strong>Drop-off Location:</strong> {dropoffLocation}</p>
                <p><strong>Start Date:</strong> {startDate}</p>
                <p><strong>End Date:</strong> {endDate}</p>
                <p><strong>Number of Days:</strong> {numDays}</p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/payment")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                    >
                        Proceed to payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;

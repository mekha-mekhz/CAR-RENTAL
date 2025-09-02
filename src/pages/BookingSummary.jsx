import React from "react";
import { useNavigate } from "react-router-dom";

function BookingSummary() {
    const navigate = useNavigate();
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
                <h2 className="text-xl font-bold">No booking found.</h2>
                <button
                    onClick={() => navigate("/search")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Go to Cars
                </button>
            </div>
        );
    }

    const {
        name,
        email,
        phone,
        driverOption,
        deliveryType,
        location,
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
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Start Date:</strong> {startDate}</p>
                <p><strong>End Date:</strong> {endDate}</p>
                <p><strong>Number of Days:</strong> {numDays}</p>
                <p><strong>Total Price:</strong> ${totalPrice}</p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/payment")}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                    >
                        Proceed to Payment
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;

import React from "react";
import { useNavigate } from "react-router-dom";

function BookingSummary() {
    const navigate = useNavigate();
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));

    if (!booking) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-xl font-bold">No booking found.</h2>
                <button
                    onClick={() => navigate("/cars")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Go to Cars
                </button>
            </div>
        );
    }

    const { name, email, startDate, endDate, car } = booking;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Booking Confirmed ✅
            </h1>

            <h2 className="text-xl font-semibold mb-2">Car Details</h2>
            <p><strong>Name:</strong> {car.name}</p>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Price:</strong> ${car.price}</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Your Details</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>End Date:</strong> {endDate}</p>

            <p className="mt-4 text-green-600 font-semibold text-center">
                Your booking is confirmed!
            </p>

            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default BookingSummary;

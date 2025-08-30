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
                    onClick={() => navigate("/search")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Go to Cars
                </button>
            </div>
        );
    }

    const { name, email, phone, driverOption, deliveryType, location, startDate, endDate, numDays, totalPrice, car } = booking;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Booking Summary ✅</h1>

            <h2 className="text-xl font-semibold mb-2">Car Details</h2>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Price per Day:</strong> ${car.price}</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Your Details</h2>
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
                    className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                    Proceed to Payment
                </button>

            </div>
        </div>
    );
}

export default BookingSummary;

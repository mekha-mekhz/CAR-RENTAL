import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
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

    const { totalPrice } = booking;

    const handlePayment = () => {
        alert("Payment Successful ✅");
        navigate("/support");
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Payment Page 💳</h1>
            <p className="mb-4 text-lg">Total Amount: <strong>${totalPrice}</strong></p>
            <button
                onClick={handlePayment}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                Pay Now
            </button>
        </div>
    );
}

export default PaymentPage;

import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
    const navigate = useNavigate();
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
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

    const { totalPrice } = booking;

    const handlePayment = (method) => {
        alert(`Payment Successful ✅\nMethod: ${method}`);
        navigate("/support");
    };

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
            <div className="max-w-lg w-full bg-gray-900 text-white shadow-lg rounded-lg p-6 md:p-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-400">Payment Page 💳</h1>
                <p className="mb-6 text-lg">
                    Total Amount: <strong>${totalPrice}</strong>
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => handlePayment("UPI")}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                    >
                        Pay with UPI
                    </button>
                    <button
                        onClick={() => handlePayment("COD")}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
                    >
                        Cash on Delivery (COD)
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

export default PaymentPage;

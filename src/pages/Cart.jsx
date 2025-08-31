import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBookNow = (car) => {
        // ✅ Remove from cart before navigating
        dispatch(removeFromCart(car.id));

        // ✅ Go to booking form with car details
        navigate("/booking", { state: car });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty 🛒</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cartItems.map((car) => (
                        <div
                            key={car.id}
                            className="border rounded-xl shadow-lg p-4 bg-white hover:shadow-2xl transition"
                        >
                            <img
                                src={car.image}
                                alt={car.model}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold">{car.model}</h2>
                            <p className="text-gray-600">Brand: {car.brand}</p>
                            <p className="text-gray-600">Price: ${car.price}</p>

                            {/* Buttons */}
                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={() => handleBookNow(car)}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
                                    disabled={!car.available}
                                >
                                    Book Now
                                </button>

                                <button
                                    onClick={() => dispatch(removeFromCart(car.id))}
                                    className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;

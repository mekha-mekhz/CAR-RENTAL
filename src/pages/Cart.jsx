import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/CartSlice";

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // ✅ Ensure price is numeric
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty 🛒</h2>
                <p className="text-gray-500 mt-2">Browse cars and add them to your cart.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-xl shadow-lg p-4 bg-white flex flex-col"
                    >
                        <img
                            src={item.image}
                            alt={item.model || item.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold">{item.model || item.name}</h2>
                        <p className="text-gray-600">Brand: {item.brand}</p>
                        <p className="text-gray-800 font-semibold">Price: ${item.price}</p>
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="mt-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 w-full"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-right">
                <p className="text-xl font-bold">Total: ${totalPrice}</p>
                <button
                    onClick={() => dispatch(clearCart())}
                    className="mt-3 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
}

export default Cart;

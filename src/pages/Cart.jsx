import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/CartSlice";

function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="border rounded-xl shadow-lg p-4 bg-white">
                                <img
                                    src={item.image}
                                    alt={item.model}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold">{item.model}</h2>
                                <p className="text-gray-600">Brand: {item.brand}</p>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-right">
                        <p className="text-xl font-bold">Total: ${totalPrice}</p>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;

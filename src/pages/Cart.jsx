import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./redux/cartSlice";

function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {items.length === 0 ? (
                <p>No vehicles in cart</p>
            ) : (
                <div>
                    {items.map((car) => (
                        <div key={car.id} className="flex justify-between items-center border-b py-2">
                            <p>{car.name} - ${car.price}</p>
                            <button
                                onClick={() => dispatch(removeFromCart(car.id))}
                                className="text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;

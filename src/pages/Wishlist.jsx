import React, { useEffect, useState } from "react";

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(wishlist);
    }, []);

    const handleRemove = (id) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlistItems(updatedWishlist);
    };

    if (wishlistItems.length === 0) {
        return <h2 className="text-center text-xl mt-6">Your wishlist is empty.</h2>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishlistItems.map(car => (
                    <div key={car.id} className="border rounded-xl shadow-lg p-4 bg-white">
                        <img src={car.image} alt={car.name || car.model} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-semibold">{car.name || car.model}</h2>
                        <p className="text-gray-600">Brand: {car.brand}</p>
                        <p className="text-gray-600">Price: ${car.price}</p>
                        <button
                            onClick={() => handleRemove(car.id)}
                            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;

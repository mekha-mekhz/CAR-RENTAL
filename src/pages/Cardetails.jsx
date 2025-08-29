import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cardetails() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => {
                const foundCar = data.find((c) => c.id === parseInt(carId));
                setCar(foundCar);
            });
    }, [carId]);

    if (!car) {
        return <h2 className="text-center text-xl">Loading car details...</h2>;
    }

    // Add to Cart
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.find((item) => item.id === car.id)) {
            cart.push(car);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Car added to cart ✅");
        } else {
            alert("Car already in cart");
        }
    };

    // Add to Wishlist
    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!wishlist.find((item) => item.id === car.id)) {
            wishlist.push(car);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert("Car added to wishlist ❤️");
        } else {
            alert("Car already in wishlist");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
            <img
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{car.name || car.model}</h1>
            <p className="text-gray-600 mb-2">Brand: {car.brand}</p>
            <p className="text-gray-600 mb-2">Model: {car.model}</p>
            <p className="text-gray-600 mb-2">Year: {car.year}</p>
            <p className="text-gray-800 font-semibold mb-2">Price per day: ${car.price}</p>
            <p className="text-gray-600 mb-2">Type: {car.type}</p>
            <p className="text-gray-600 mb-2">
                Features: {car.features?.join(", ")}
            </p>
            <p className={`mt-2 font-bold ${car.available ? "text-green-600" : "text-red-600"}`}>
                {car.available ? "Available" : "Not Available"}
            </p>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleAddToCart}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    disabled={!car.available} // optional: disable if unavailable
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleAddToWishlist}
                    className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600"
                >
                    Wishlist
                </button>
            </div>
        </div>
    );
}

export default Cardetails;

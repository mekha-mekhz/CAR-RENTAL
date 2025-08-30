import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/CartSlice"; // ✅ adjust path if needed

function Filter() {
    const [cars, setCars] = useState([]);
    const [queryInput, setQueryInput] = useState("");
    const [query, setQuery] = useState("");
    const [brand, setBrand] = useState("All");
    const [price, setPrice] = useState("All");
    const [availability, setAvailability] = useState("All");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Fetch cars from JSON
    useEffect(() => {
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    // ✅ Filtering logic
    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            query === "" ||
            (car.model?.toLowerCase().includes(query.toLowerCase()) ||
                car.brand?.toLowerCase().includes(query.toLowerCase()));

        const matchesBrand = brand === "All" || car.brand === brand;

        const matchesPrice =
            price === "All" ||
            (price === "Low" && car.price < 2000) ||
            (price === "Mid" && car.price >= 2000 && car.price <= 4000) ||
            (price === "High" && car.price > 4000);

        const matchesAvailability =
            availability === "All" ||
            (availability === "Available" && car.available === true) ||
            (availability === "NotAvailable" && car.available === false);

        return matchesSearch && matchesBrand && matchesPrice && matchesAvailability;
    });

    // ✅ Book Now
    const handleBookNow = (car) => {
        navigate("/booking", { state: car });
    };

    // ✅ Add to Cart
    const handleAddToCart = (car) => {
        dispatch(addToCart(car));
        alert(`${car.brand} added to cart ✅`);
    };

    // ✅ Add to Wishlist
    const handleAddToWishlist = (car) => {
        dispatch(addToWishlist(car));
        alert(`${car.brand} added to wishlist ❤️`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Find Your Car</h1>

            {/* 🔎 Search + Filters */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by model or brand..."
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="border p-2 rounded-lg w-64"
                />
                <button
                    onClick={() => setQuery(queryInput)}
                    className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>

                {/* Brand filter */}
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    <option value="All">All Brands</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Ford">Ford</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Kia">Kia</option>
                    <option value="Chevrolet">Chevrolet</option>
                </select>

                {/* Price filter */}
                <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    <option value="All">All Prices</option>
                    <option value="Low">Below $2000</option>
                    <option value="Mid">$2000 - $4000</option>
                    <option value="High">Above $4000</option>
                </select>

                {/* Availability filter */}
                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="NotAvailable">Not Available</option>
                </select>
            </div>

            {/* 🚗 Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
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
                            <p
                                className={`font-semibold ${car.available ? "text-green-600" : "text-red-600"}`}
                            >
                                {car.available ? "Available" : "Not Available"}
                            </p>

                            {/* Buttons */}
                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={() => handleBookNow(car)}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                                    disabled={!car.available}
                                >
                                    Book Now
                                </button>

                                <button
                                    onClick={() => handleAddToCart(car)}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => handleAddToWishlist(car)}
                                    className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500"
                                >
                                    Wishlist
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No cars found
                    </p>
                )}
            </div>
        </div>
    );
}

export default Filter;

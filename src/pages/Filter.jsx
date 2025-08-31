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
    const [sortBy, setSortBy] = useState("None");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Fetch cars
    useEffect(() => {
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    // ✅ Filtering
    let filteredCars = cars.filter((car) => {
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

    // ✅ Sorting logic
    if (sortBy === "PriceLowHigh") {
        filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
    } else if (sortBy === "PriceHighLow") {
        filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
    } else if (sortBy === "BrandAZ") {
        filteredCars = [...filteredCars].sort((a, b) =>
            a.brand.localeCompare(b.brand)
        );
    } else if (sortBy === "ModelAZ") {
        filteredCars = [...filteredCars].sort((a, b) =>
            a.model.localeCompare(b.model)
        );
    }

    // ✅ Actions
    const handleBookNow = (car) => {
        navigate("/booking", { state: car });
    };
    const handleAddToCart = (car) => {
        dispatch(addToCart(car));
        alert(`${car.brand} added to cart ✅`);
    };
    const handleAddToWishlist = (car) => {
        dispatch(addToWishlist(car));
        alert(`${car.brand} added to wishlist ❤️`);
    };

    // ✅ Reset Filters
    const handleClearAll = () => {
        setQueryInput("");
        setQuery("");
        setBrand("All");
        setPrice("All");
        setAvailability("All");
        setSortBy("None");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">🚗 Find Your Perfect Car</h1>

            {/* 🔎 Search + Filters (Sticky Toolbar) */}
            <div className="sticky top-0 z-10 bg-white shadow-md rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-center">
                {/* Search */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by model or brand..."
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setQuery(queryInput)}
                        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>

                {/* Brand filter */}
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="NotAvailable">Not Available</option>
                </select>

                {/* Sort by */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="None">Sort By</option>
                    <option value="PriceLowHigh">Price: Low → High</option>
                    <option value="PriceHighLow">Price: High → Low</option>
                    <option value="BrandAZ">Brand: A → Z</option>
                    <option value="ModelAZ">Model: A → Z</option>
                </select>

                {/* ✅ Clear All Filters */}
                <button
                    onClick={handleClearAll}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Clear All
                </button>
            </div>

            {/* 🚗 Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div
                            key={car.id}
                            className="group border rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition duration-300"
                        >
                            {/* Car Image */}
                            <div className="relative">
                                <img
                                    src={car.image}
                                    alt={car.model}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                                />
                                <span
                                    className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full ${car.available
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {car.available ? "Available" : "Not Available"}
                                </span>
                            </div>

                            {/* Car Info */}
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">{car.model}</h2>
                                <p className="text-sm text-gray-500">Brand: {car.brand}</p>
                                <p className="text-lg font-semibold text-blue-600 mt-2">${car.price}</p>

                                {/* Buttons */}
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={() => handleBookNow(car)}
                                        className="w-full bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition"
                                        disabled={!car.available}
                                    >
                                        Book Now
                                    </button>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(car)}
                                            className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition"
                                        >
                                            Cart
                                        </button>
                                        <button
                                            onClick={() => handleAddToWishlist(car)}
                                            className="flex-1 bg-yellow-400 text-black py-2 rounded-xl font-medium hover:bg-yellow-500 transition"
                                        >
                                            Wishlist
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/car/${car.id}`, { state: car })}
                                        className="w-full bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-black transition"
                                    >
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No cars found</p>
                )}
            </div>
        </div>
    );
}

export default Filter;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/CartSlice";

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

    useEffect(() => {
        // Fetch JSON cars
        fetch("https://raw.githubusercontent.com/mekha-mekhz/RentalCarDetails/main/RentalDetails.json")
            .then((res) => res.json())
            .then((data) => {
                // Get approved vehicles from admin
                const approvedVehicles = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
                setCars([...approvedVehicles, ...data]);
            })
            .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    // Filtering logic
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

    // Sorting logic
    if (sortBy === "PriceLowHigh") filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
    else if (sortBy === "PriceHighLow") filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
    else if (sortBy === "BrandAZ") filteredCars = [...filteredCars].sort((a, b) => a.brand.localeCompare(b.brand));
    else if (sortBy === "ModelAZ") filteredCars = [...filteredCars].sort((a, b) => a.model.localeCompare(b.model));

    // Actions
    const handleBookNow = (car) => navigate("/booking", { state: car });
    const handleAddToCart = (car) => {
        dispatch(addToCart(car));
        alert(`${car.brand} added to cart ✅`);
    };
    const handleAddToWishlist = (car) => {
        dispatch(addToWishlist(car));
        alert(`${car.brand} added to wishlist ❤️`);
    };

    const handleClearAll = () => {
        setQueryInput("");
        setQuery("");
        setBrand("All");
        setPrice("All");
        setAvailability("All");
        setSortBy("None");
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">🚗 Find Your Perfect Car</h1>

            {/* Search + Filters */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-center transition-colors duration-300">
                <input
                    type="text"
                    placeholder="Search by model or brand..."
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="border p-2 rounded-lg w-64 bg-white dark:bg-gray-700 text-black dark:text-white"
                />
                <button onClick={() => setQuery(queryInput)} className="bg-blue-600 dark:bg-blue-500 text-white px-4 rounded-lg">Search</button>

                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white">
                    <option value="All">All Brands</option>
                    {[...new Set(cars.map(c => c.brand))].map((b, idx) => <option key={idx} value={b}>{b}</option>)}
                </select>

                <select value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white">
                    <option value="All">All Prices</option>
                    <option value="Low">Below $2000</option>
                    <option value="Mid">$2000 - $4000</option>
                    <option value="High">Above $4000</option>
                </select>

                <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white">
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="NotAvailable">Not Available</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white">
                    <option value="None">Sort By</option>
                    <option value="PriceLowHigh">Price: Low → High</option>
                    <option value="PriceHighLow">Price: High → Low</option>
                    <option value="BrandAZ">Brand: A → Z</option>
                    <option value="ModelAZ">Model: A → Z</option>
                </select>

                <button onClick={handleClearAll} className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg">Clear All</button>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCars.length > 0 ? filteredCars.map(car => (
                    <div key={car.id} className="group border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 relative">
                        {/* NEW badge for new vehicles */}
                        {car.newBadge && (
                            <span className="absolute top-2 left-2 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black px-3 py-1 rounded-full font-semibold text-xs z-10">
                                NEW
                            </span>
                        )}

                        <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />

                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{car.model}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Brand: {car.brand}</p>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">${car.price}</p>
                            <p className={`mt-1 font-medium ${car.available ? "text-green-600" : "text-red-600"}`}>
                                {car.available ? "Available" : "Not Available"}
                            </p>

                            <div className="mt-4 space-y-2">
                                <button onClick={() => handleBookNow(car)} disabled={!car.available} className="w-full bg-green-600 dark:bg-green-500 text-white py-2 rounded-xl">Book Now</button>
                                <div className="flex gap-2">
                                    <button onClick={() => handleAddToCart(car)} className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-xl">Cart</button>
                                    <button onClick={() => handleAddToWishlist(car)} className="flex-1 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black py-2 rounded-xl">Wishlist</button>
                                </div>
                                <button onClick={() => navigate(`/car/${car.id}`, { state: car })} className="w-full bg-gray-900 dark:bg-gray-700 text-white py-2 rounded-xl">View More</button>
                            </div>
                        </div>
                    </div>
                )) : <p className="col-span-full text-center text-gray-500 dark:text-gray-300">No cars found</p>}
            </div>
        </div>
    );
}

export default Filter;

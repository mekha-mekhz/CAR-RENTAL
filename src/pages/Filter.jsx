import React, { useEffect, useState } from "react";

function Filter() {
    const [cars, setCars] = useState([]);
    const [queryInput, setQueryInput] = useState(""); // live typing
    const [query, setQuery] = useState(""); // applied search
    const [brand, setBrand] = useState("All");
    const [price, setPrice] = useState("All");

    useEffect(() => {
        fetch("/cars.json")
            .then((res) => res.json())
            .then((data) => setCars(data));
    }, []);


    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            query === "" ||
            car.name.toLowerCase().includes(query.toLowerCase()) ||
            car.brand.toLowerCase().includes(query.toLowerCase());

        const matchesBrand = brand === "All" || car.brand === brand;

        const matchesPrice =
            price === "All" ||
            (price === "Low" && car.price < 2000) ||
            (price === "Mid" && car.price >= 2000 && car.price <= 4000) ||
            (price === "High" && car.price > 4000);

        return matchesSearch && matchesBrand && matchesPrice;
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Find Your Car</h1>

            {/* Search + Filters */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search by name or brand..."
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="border p-2 rounded-lg w-64"
                />
                <button
                    onClick={() => setQuery(queryInput)} // apply search
                    className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>

                {/* Brand Filter */}
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
                </select>

                {/* Price Filter */}
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
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div
                            key={car.id}
                            className="border rounded-xl shadow-lg p-4 bg-white hover:shadow-2xl transition"
                        >
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold">{car.name}</h2>
                            <p className="text-gray-600">Brand: {car.brand}</p>
                            <p className="text-gray-600">Price: ${car.price}</p>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                Book Now
                            </button>
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

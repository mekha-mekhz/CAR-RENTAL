import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => setCars(data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Cars</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cars.map((car) => (
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


                        <Link
                            to={`/cars/${car.id}`}
                            className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            View More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carlist;

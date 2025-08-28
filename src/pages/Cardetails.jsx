import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cardetails() {
    const { carId } = useParams(); // ✅ get carId from URL
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

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
            <img
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-gray-600 mb-2">Brand: {car.brand}</p>
            <p className="text-gray-600 mb-2">Model: {car.model}</p>
            <p className="text-gray-600 mb-2">Year: {car.year}</p>
            <p className="text-gray-800 font-semibold mb-2">
                Price per day: ${car.price}
            </p>
            <p className="text-gray-600 mb-2">Type: {car.type}</p>
            <p className="text-gray-600 mb-2">
                Features: {car.features?.join(", ")}
            </p>
            <p
                className={`mt-2 font-bold ${car.available ? "text-green-600" : "text-red-600"
                    }`}
            >
                {car.available ? "Available" : "Not Available"}
            </p>
        </div>
    );
}

export default Cardetails;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CarDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state;

    if (!car) {
        return <p className="text-center mt-10 text-red-500">Car details not found</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
                ⬅ Back
            </button>
            <div className="border rounded-xl shadow-lg p-6 bg-white">
                <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h1 className="text-3xl font-bold">{car.model}</h1>
                <p className="text-xl text-gray-700">Brand: {car.brand}</p>
                <p className="text-xl text-gray-700">Year: {car.year}</p>
                <p className="text-xl text-gray-700">Price: ${car.price}</p>
                <p
                    className={`text-lg font-semibold mt-2 ${car.available ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {car.available ? "Available" : "Not Available"}
                </p>
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Features:</h2>
                    <ul className="list-disc ml-6 text-gray-600">
                        {car.features?.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CarDetails;

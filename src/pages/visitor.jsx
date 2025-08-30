import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VisitorCarDetails() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

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

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleBackHome = () => {
        navigate("/");
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

            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleLoginRedirect}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                    Login to Continue
                </button>
                <button
                    onClick={handleBackHome}
                    className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default VisitorCarDetails;

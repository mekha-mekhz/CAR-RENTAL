import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Support() {
    const navigate = useNavigate();
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch JSON cars
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => {
                // Combine with admin-added vehicles
                const approvedVehicles = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
                setCarData([...approvedVehicles, ...data]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (!booking) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-xl font-bold text-white">No booking found.</h2>
                <button
                    onClick={() => navigate("/search")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Go to Cars
                </button>
            </div>
        );
    }

    if (loading) {
        return <p className="text-center mt-20 text-white">Loading support details...</p>;
    }

    const { car, location } = booking;

    // Find the full car object from either JSON or admin-added cars
    const selectedCar = carData.find((c) => c.id === car.id);

    // Support team for the selected location
    const supportTeam =
        selectedCar?.locations?.find((loc) => loc.name === location)?.support ||
        selectedCar?.supporters || [];

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
            <div className="max-w-lg w-full bg-gray-900 text-white shadow-lg rounded-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Support Team 🛠️</h1>
                <p className="mb-4 text-green-400">
                    Thank you! We provide your car in good condition. As it is a machine,
                    mismatches may happen, so we truly consider you. Our support team is
                    available anytime.
                </p>

                <h2 className="text-xl font-semibold mb-3">
                    Mechanic Details for {car.brand} in {location}
                </h2>

                {supportTeam && supportTeam.length > 0 ? (
                    <ul className="space-y-3">
                        {supportTeam.map((support, index) => (
                            <li
                                key={support.id || index}
                                className="border border-gray-700 p-3 rounded-lg"
                            >
                                <p className="font-semibold">{support.name}</p>
                                {support.phone && <p>Phone: {support.phone}</p>}
                                {support.email && <p>Email: {support.email}</p>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No support team found for this location.</p>
                )}

                <p className="mt-4 text-gray-300 text-sm">
                    Support details will also be sent to your registered email.
                </p>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Support;

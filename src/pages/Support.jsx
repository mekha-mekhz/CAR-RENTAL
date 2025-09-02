import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Support() {
    const navigate = useNavigate();
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));

    useEffect(() => {
        fetch("https://mekha-mekhz.github.io/carsdetails/cardetails.json")
            .then((res) => res.json())
            .then((data) => {
                setCarData(data);
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
                <h2 className="text-xl font-bold">No booking found.</h2>
                <button
                    onClick={() => navigate("/search")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Go to Cars
                </button>
            </div>
        );
    }

    if (loading) return <p className="text-center mt-20">Loading support details...</p>;

    const { car, location } = booking;
    const selectedCar = carData.find((c) => c.id === car.id);
    const supportTeam =
        selectedCar?.locations.find((loc) => loc.name === location)?.support || [];

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Support Team 🛠️</h1>
            <p className="mb-4 text-green-600">
                Thank you! We provide your car in good condition. As it is a machine,
                mismatches may happen, so we truly consider you. Our support team is
                available anytime.
            </p>

            <h2 className="text-xl font-semibold mb-2">
                Mechanic Details for {car.brand} in {location}
            </h2>

            {supportTeam.length > 0 ? (
                <ul className="space-y-2">
                    {supportTeam.map((support) => (
                        <li key={support.id} className="border p-2 rounded-lg">
                            <p>
                                <strong>{support.name}</strong>
                            </p>
                            <p>Phone: {support.phone}</p>
                            <p>Email: {support.email}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No support team found for this location.</p>
            )}

            <p className="mt-4 text-gray-600 text-sm">
                Support details will also be sent to your registered email.
            </p>

            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default Support;

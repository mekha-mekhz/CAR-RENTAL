import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Support() {
    const navigate = useNavigate();
    const booking = JSON.parse(sessionStorage.getItem("latestBooking"));
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/mekha-mekhz/RentalCarDetails/main/RentalDetails.json")
            .then((res) => res.json())
            .then((data) => {
                const approvedVehicles = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
                setCarData([...approvedVehicles, ...data]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Redirect to Thank You page after 6 seconds
    useEffect(() => {
        if (!loading && booking) {
            const timer = setTimeout(() => {
                navigate("/thank-you");
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [loading, booking, navigate]);

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

    const { car } = booking;
    const selectedCar = carData.find((c) => c.id === car.id);
    const allSupportTeams = selectedCar?.locations || [];

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 relative overflow-hidden">
            <div className="max-w-3xl w-full bg-gray-900 text-white shadow-lg rounded-lg p-6 md:p-8 animate-fadeIn">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-400 animate-pulse">
                    Support Teams Across Kerala 🛠️
                </h1>

                <p className="mb-4 text-green-300 text-center">
                    Our support team is available in all 14 districts to ensure your journey is smooth and safe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allSupportTeams.map((location) => (
                        <div
                            key={location.name}
                            className="bg-gray-800 p-4 rounded-lg transition transform hover:scale-105 duration-300"
                        >
                            <h2 className="text-xl font-semibold text-blue-400">{location.name}</h2>
                            {location.support.map((support) => (
                                <div key={support.id} className="mt-2">
                                    <p><strong>Name:</strong> {support.name}</p>
                                    <p><strong>Phone:</strong> {support.phone}</p>
                                    {support.email && <p><strong>Email:</strong> {support.email}</p>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-yellow-400 font-bold animate-bounce">

                    </p>
                </div>
            </div>

            {/* Animated Car */}
            <div className="absolute bottom-4 left-0 w-full overflow-hidden">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/743/743007.png"
                    alt="Moving Car"
                    className="h-16 animate-carRun"
                />
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

                @keyframes carRun {
                    0% { transform: translateX(-100px); }
                    100% { transform: translateX(110%); }
                }
                .animate-carRun {
                    animation: carRun 8s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default Support;

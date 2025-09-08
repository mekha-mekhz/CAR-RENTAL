import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const approvedFeedbacks = JSON.parse(localStorage.getItem("approvedFeedbacks")) || [];

        const dummyFeedbacks = [
            {
                name: "Arjun Kumar",
                role: "Customer",
                feedback: "Amazing service! The car was in perfect condition and the booking process was smooth.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
                name: "Priya Nair",
                role: "Customer",
                feedback: "Loved the experience! Affordable rates and excellent support.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
                name: "Rohit Sharma",
                role: "Customer",
                feedback: "Highly recommend FastLane for anyone looking for luxury cars on rent!",
                image: "https://randomuser.me/api/portraits/men/55.jpg"
            }
        ];

        setFeedbacks(approvedFeedbacks.length > 0 ? approvedFeedbacks : dummyFeedbacks);
    }, []);

    return (
        <div className="w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://autonexa.com/wp-content/uploads/2020/12/luxury-cars.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-yellow-400/40 dark:bg-black/70"></div>

                <div className="relative z-10 max-w-3xl">
                    {/* Animated FastLane Name */}
                    <h1 className="text-7xl md:text-9xl font-extrabold text-black dark:text-white mb-6 animate-bounceIn tracking-tight">
                        <span className="text-yellow-400 drop-shadow-lg">FastLane</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-2xl mb-8 text-gray-800 dark:text-gray-200 animate-slideIn">
                        Rent Your Dream Car Today 🚗✨ <br />
                        Affordable, reliable, and luxurious cars just a click away.
                    </p>

                    {/* Browse Cars Button */}
                    <Link
                        to="/search"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 dark:bg-yellow-500 dark:text-black hover:scale-105 transition transform"
                    >
                        Browse Cars
                    </Link>
                </div>

                {/* Animated Car Emoji */}
                <div className="absolute bottom-10 left-[-100px] animate-carRun text-4xl md:text-6xl">
                    🚗
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center filter blur-sm opacity-40"></div>
                <div className="relative max-w-6xl mx-auto text-black dark:text-white">
                    <h2 className="text-5xl font-bold mb-6 animate-slideIn">🚘 Featured Cars</h2>
                    <p className="text-gray-800 dark:text-gray-300 mb-12 animate-slideIn delay-100">
                        Explore our top picks of luxury and budget-friendly cars for your next ride.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition animate-fadeIn delay-200">
                            <img
                                src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
                                alt="Luxury Sedan"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Luxury Sedan</h3>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition animate-fadeIn delay-400">
                            <img
                                src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
                                alt="SUV"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">SUV</h3>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition animate-fadeIn delay-600">
                            <img
                                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                                alt="Convertible"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Convertible</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Category */}
            <section className="relative py-16 px-6 text-center">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center filter blur-sm opacity-30"></div>
                <div className="relative max-w-6xl mx-auto text-black dark:text-white">
                    <h2 className="text-4xl font-bold mb-6 animate-slideIn">🔎 Browse by Category</h2>
                    <p className="text-gray-800 dark:text-gray-300 mb-10 animate-slideIn delay-100">
                        Choose from a wide range of vehicles tailored to your needs.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {["SUVs", "Sedans", "Hatchbacks", "Sports Cars"].map((cat, i) => (
                            <div
                                key={i}
                                className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition transform animate-fadeIn delay-[${i * 200}]"
                            >
                                {cat === "SUVs" ? "🚙 " : cat === "Sedans" ? "🚗 " : cat === "Hatchbacks" ? "🚕 " : "🏎️ "}
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white animate-slideIn">
                        What Our Customers Say
                    </h2>

                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-700 dark:text-gray-300">
                            No verified feedbacks yet.
                        </p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-3">
                            {feedbacks.map((fb, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition transform animate-fadeIn delay-[${idx * 200}]"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={fb.image || "https://via.placeholder.com/50"}
                                            alt={fb.name}
                                            className="w-14 h-14 rounded-full border-2 border-yellow-400"
                                        />
                                        <div>
                                            <h3 className="text-lg font-extrabold text-gray-800 dark:text-white">{fb.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{fb.role || "Customer"}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 italic">“{fb.feedback}”</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Animations CSS */}
            {/* <style>
                {`
          @keyframes bounceIn {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            80% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
          @keyframes slideIn {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes carRun {
            0% { left: -100px; }
            100% { left: 100vw; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-bounceIn { animation: bounceIn 1s ease forwards; }
          .animate-slideIn { animation: slideIn 1s ease forwards; }
          .animate-carRun { animation: carRun 6s linear infinite; }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        `}
            </style> */}
        </div>
    );
}

export default Homepage;

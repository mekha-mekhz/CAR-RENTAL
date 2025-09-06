import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        // Load only admin-approved feedbacks from localStorage
        const approvedFeedbacks = JSON.parse(localStorage.getItem("approvedFeedbacks")) || [];

        // Dummy feedbacks if none in localStorage
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
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-[url('https://autonexa.com/wp-content/uploads/2020/12/luxury-cars.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-yellow-400/40 dark:bg-black/70"></div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
                        Rent Your Dream Car Today 🚗✨
                    </h1>
                    <p className="text-lg mb-8 text-gray-800 dark:text-gray-200">
                        Affordable, reliable, and luxurious cars just a click away.
                    </p>
                    <Link
                        to="/search"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 dark:bg-yellow-500 dark:text-black"
                    >
                        Browse Cars
                    </Link>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="relative py-16 px-6 text-center">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-yellow-400/40 dark:bg-black/80"></div>

                <div className="relative max-w-6xl mx-auto text-center text-black dark:text-white">
                    <h2 className="text-4xl font-bold mb-6">🚘 Featured Cars</h2>
                    <p className="text-gray-800 dark:text-gray-300 mb-10">
                        Explore our top picks of luxury and budget-friendly cars for your next ride.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
                                alt="Luxury Sedan"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Luxury Sedan</h3>
                                {/* <p className="text-gray-700 dark:text-gray-300">From ₹2500/day</p> */}
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
                                alt="SUV"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">SUV</h3>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                                alt="Convertible"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Convertible</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Category */}
            <section className="relative py-16 px-6 text-center">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-yellow-400/40 dark:bg-black/85"></div>

                <div className="relative max-w-6xl mx-auto text-center text-black dark:text-white">
                    <h2 className="text-4xl font-bold mb-6">🔎 Browse by Category</h2>
                    <p className="text-gray-800 dark:text-gray-300 mb-10">
                        Choose from a wide range of vehicles tailored to your needs.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">🚙 SUVs</div>
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">🚗 Sedans</div>
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">🚕 Hatchbacks</div>
                        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">🏎️ Sports Cars</div>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                        What Our Customers Say
                    </h2>

                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-700 dark:text-gray-300">
                            No verified feedbacks yet.
                        </p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-3">
                            {feedbacks.map((fb, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={fb.image || "https://via.placeholder.com/50"}
                                            alt={fb.name}
                                            className="w-14 h-14 rounded-full border-2 border-yellow-400"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{fb.name}</h3>
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
        </div>
    );
}

export default Homepage;

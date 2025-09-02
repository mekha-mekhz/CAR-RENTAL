import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
                {/* Background image + overlay */}
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-6">
                        Rent Your Dream Car Today 🚗✨
                    </h1>
                    <p className="text-lg mb-8 text-gray-200">
                        Affordable, reliable, and luxurious cars just a click away.
                    </p>
                    <Link
                        to="/search"
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
                    >
                        Browse Cars
                    </Link>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="relative py-16 px-6 text-white">
                {/* Background image + overlay */}
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-gray-900/85 to-black/85"></div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">🚘 Featured Cars</h2>
                    <p className="text-gray-300 mb-10">
                        Explore our top picks of luxury and budget-friendly cars for your next ride.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
                                alt="Luxury Sedan"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Luxury Sedan</h3>
                                <p className="text-gray-300">From ₹2500/day</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
                                alt="SUV"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">SUV</h3>
                                {/* <p className="text-gray-300">From ₹2000/day</p> */}
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition">
                            <img
                                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                                alt="Convertible"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Convertible</h3>
                                {/* <p className="text-gray-300">From ₹3000/day</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Category */}
            <section className="relative py-16 px-6 text-white">
                {/* Background image + overlay */}
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-gray-800/80 to-black/85"></div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">🔎 Browse by Category</h2>
                    <p className="text-gray-300 mb-10">
                        Choose from a wide range of vehicles tailored to your needs.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">
                            🚙 SUVs
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">
                            🚗 Sedans
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">
                            🚕 Hatchbacks
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">
                            🏎️ Sports Cars
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;

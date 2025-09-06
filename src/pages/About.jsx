import React from "react";

function About() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 transition-colors duration-500">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-16 transition-colors duration-500">

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
                    About Us
                </h1>

                {/* Intro */}
                <p className="text-center text-gray-700 dark:text-gray-300 text-base md:text-lg mb-10 px-2 md:px-0">
                    At <span className="font-semibold text-blue-600 dark:text-blue-300">FastLane Car Rental</span>,
                    we provide reliable, affordable, and top-quality car rental services to help you travel in comfort and style.
                </p>

                {/* Mission & Vision */}
                <div className="grid gap-8 md:grid-cols-2 mb-10">
                    <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            To offer convenient and reliable car rental solutions that make your travel experience seamless and enjoyable.
                        </p>
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Our Vision</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            To be the leading car rental provider in the region, known for customer satisfaction, quality service, and trust.
                        </p>
                    </div>
                </div>

                {/* Service Highlights */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Wide Range of Cars</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            Choose from a variety of vehicles to suit your travel needs.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Affordable Pricing</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            Competitive rates without compromising quality or comfort.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">24/7 Support</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            Our support team is always ready to help you with your bookings and queries.
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default About;

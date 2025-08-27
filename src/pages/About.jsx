import React from "react";

function About() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-16">

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-blue-700">
                    About Us
                </h1>

                {/* Intro */}
                <p className="text-center text-gray-700 text-base md:text-lg mb-10 px-2 md:px-0">
                    At <span className="font-semibold text-yellow-500">FastLane Car Rental</span>, we provide reliable, affordable, and top-quality car rental services to help you travel in comfort and style.
                </p>

                {/* Mission & Vision */}
                <div className="grid gap-8 md:grid-cols-2 mb-10">
                    <div className="p-4 md:p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2 text-blue-700">Our Mission</h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            To offer convenient and reliable car rental solutions that make your travel experience seamless and enjoyable.
                        </p>
                    </div>
                    <div className="p-4 md:p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2 text-blue-700">Our Vision</h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            To be the leading car rental provider in the region, known for customer satisfaction, quality service, and trust.
                        </p>
                    </div>
                </div>

                {/* Service Highlights */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Wide Range of Cars</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                            Choose from a variety of vehicles to suit your travel needs.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Affordable Pricing</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                            Competitive rates without compromising quality or comfort.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-700 text-sm md:text-base">
                            Our support team is always ready to help you with your bookings and queries.
                        </p>
                    </div>
                </div>

                {/* Optional: Team Image */}
                <div className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">Meet Our Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                        <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;

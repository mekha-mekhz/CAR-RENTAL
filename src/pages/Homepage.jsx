// Homepage.jsx
import React from "react";
import { Link } from "react-router-dom";


const featuredCars = [
    { id: 1, name: "Toyota Corolla", price: "$40/day", image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg" },
    { id: 2, name: "Honda Civic", price: "$45/day", image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg" },
    { id: 3, name: "BMW 3 Series", price: "$80/day", image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg" },
];

const browseCars = [
    { id: 4, name: "Ford Mustang", price: "$90/day", image: "https://images.pexels.com/photos/3065602/pexels-photo-3065602.jpeg" },
    { id: 5, name: "Audi A4", price: "$85/day", image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg" },
    { id: 6, name: "Mercedes C-Class", price: "$95/day", image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg" },
    { id: 7, name: "Nissan Altima", price: "$50/day", image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg" },
];

function Homepage() {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section
                className="relative flex justify-center items-center text-center h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/home.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative px-4 text-white max-w-4xl">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                        Welcome to <span className="text-yellow-400">FastLane</span>
                    </h1>
                    <p className="text-xl sm:text-2xl font-medium mb-8 text-gray-200">
                        Rent your dream car today. Affordable, reliable, and available anytime you need.
                    </p>
                    {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/cars"
                            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
                        >
                            Browse Cars
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                        >
                            Get Started
                        </Link>
                    </div> */}
                </div>
            </section>

            {/* Featured Cars */}
            <section className="container mx-auto my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Rentals</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredCars.map((car) => (
                        <div key={car.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-xl">{car.name}</h3>


                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Browse Fleet */}
            <section id="browse" className="container mx-auto my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Browse Our Fleet</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {browseCars.map((car) => (
                        <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                            <div className="p-3">
                                <h4 className="font-semibold">{car.name}</h4>


                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Homepage;

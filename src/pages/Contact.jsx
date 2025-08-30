import React from "react";

function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 md:p-16">

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-blue-700">Contact Us</h1>
                <p className="text-center text-gray-600 mb-10 text-lg">
                    Have a question or need assistance? We’re here to help!
                </p>

                {/* Section 1: Contact Details */}
                <div className="space-y-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Location</h2>
                        <p className="text-gray-700">123 FastLane Street, CarCity, CA 90210</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Call Us</h2>
                        <p className="text-gray-700">+91 98765 43210</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Email</h2>
                        <p className="text-gray-700">support@fastlane.com</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Get in Touch</h2>
                        <p className="text-gray-700">We’d love to hear from you. Share your questions or feedback!</p>
                    </div>
                </div>

                {/* Section 2: Contact Form */}
                <div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="enter email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="enter mobile number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Contact;

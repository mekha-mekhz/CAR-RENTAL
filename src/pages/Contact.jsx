import React from "react";

function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 transition-colors duration-500">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 md:p-16 transition-colors duration-500">

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-blue-700 dark:text-blue-400">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-10 text-lg">
                    Have a question or need assistance? We’re here to help!
                </p>

                {/* Section 1: Contact Details */}
                <div className="space-y-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Our Location</h2>
                        <p className="text-gray-700 dark:text-gray-300">123 FastLane Street, CarCity, CA 90210</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Call Us</h2>
                        <p className="text-gray-700 dark:text-gray-300">+91 98765 43210</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Email</h2>
                        <p className="text-gray-700 dark:text-gray-300">support@fastlane.com</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Get in Touch</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We’d love to hear from you. Share your questions or feedback!
                        </p>
                    </div>
                </div>

                {/* Section 2: Contact Form */}
                <div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                className="w-full border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                                           rounded-lg px-4 py-2 focus:outline-none 
                                           focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                                           rounded-lg px-4 py-2 focus:outline-none 
                                           focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your mobile number"
                                className="w-full border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                                           rounded-lg px-4 py-2 focus:outline-none 
                                           focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                                Message
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                                           rounded-lg px-4 py-2 focus:outline-none 
                                           focus:ring-2 focus:ring-blue-500 transition"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 
                                       dark:bg-blue-600 dark:hover:bg-blue-700 
                                       text-white font-semibold py-3 rounded-lg transition"
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

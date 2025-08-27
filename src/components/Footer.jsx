import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-blue-700 text-white py-10">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
                        <li><Link to="/cars" className="hover:text-yellow-400">Cars</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
                        <li><Link to="/login" className="hover:text-yellow-400">Login</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
                    <p className="mb-2">Phone: +91 98765 43210</p>
                    <p className="mb-2">Email: support@fastlane.com</p>
                    <p className="text-gray-200">We’re here to help 24/7!</p>
                </div>

                {/* Connect / Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" className="hover:text-yellow-400">Facebook</a>
                        <a href="https://twitter.com" target="_blank" className="hover:text-yellow-400">Twitter</a>
                        <a href="https://wa.me/919876543210" target="_blank" className="hover:text-yellow-400">WhatsApp</a>
                    </div>
                </div>

            </div>

            {/* Bottom Note */}
            <div className="mt-8 text-center text-gray-200">
                &copy; {new Date().getFullYear()} FastLane Car Rental. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

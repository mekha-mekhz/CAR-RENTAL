import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 mt-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
                        <li><Link to="/cars" className="hover:text-yellow-400 transition">Cars</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
                        <li><Link to="/login" className="hover:text-yellow-400 transition">Login</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Customer Support</h2>
                    <p className="mb-2">📞 +91 98765 43210</p>
                    <p className="mb-2">📧 support@fastlane.com</p>
                    <p className="text-gray-300">We’re here to help 24/7!</p>
                </div>

                {/* Connect / Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">Connect With Us</h2>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" className="hover:text-yellow-400 transition">🌐 Facebook</a>
                        <a href="https://twitter.com" target="_blank" className="hover:text-yellow-400 transition">🐦 Twitter</a>
                        <a href="https://wa.me/919876543210" target="_blank" className="hover:text-yellow-400 transition">💬 WhatsApp</a>
                    </div>
                </div>

            </div>

            {/* Bottom Note */}
            <div className="mt-10 text-center text-gray-400 border-t border-gray-700 pt-6">
                &copy; {new Date().getFullYear()} <span className="text-yellow-400">FastLane Car Rental</span>. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

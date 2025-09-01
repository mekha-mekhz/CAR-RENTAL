import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // ✅ Check if Admin
        if (email.toLowerCase().trim() === "admin@gmail.com" && password === "admin123") {
            alert("Admin login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", email }));
            navigate("/admin");
            return;
        }

        // ✅ Check Customer
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customer = customers.find(
            u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password
        );
        if (customer) {
            alert("Customer login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(customer));
            navigate("/dashboard");
            return;
        }

        // ✅ Check Agency
        const agencies = JSON.parse(localStorage.getItem("agencies")) || [];
        const agency = agencies.find(
            u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password
        );
        if (agency) {
            alert("Agency login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(agency));
            navigate("/agencydash");
            return;
        }

        // ❌ If nothing matches
        alert("Invalid email or password");
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Login Form */}
            <form
                onSubmit={handleLogin}
                className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition"
                >
                    Login
                </button>

                <p className="text-center text-gray-700 mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-700 font-semibold hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;

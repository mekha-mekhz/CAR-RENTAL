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
            navigate("/admin"); // go to admin page
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded-lg mb-6"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                    Login
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
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

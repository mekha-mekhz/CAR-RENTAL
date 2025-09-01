import React, { useState } from "react";

function CustomerRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Validate all fields
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            alert("All fields are required!");
            return;
        }

        // ✅ Check passwords match
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // ✅ Get existing customers from localStorage
        const customers = JSON.parse(localStorage.getItem("customers")) || [];

        // ✅ Remove confirmPassword before saving
        const { confirmPassword, ...newUser } = { ...form, role: "customer" };

        // ✅ Check if email already exists
        if (customers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
            alert("Email already registered!");
            return;
        }

        // ✅ Add new user
        customers.push(newUser);
        localStorage.setItem("customers", JSON.stringify(customers));
        alert("Customer registered successfully ✅");

        // ✅ Reset form
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')`, // 🚗 Car background
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-md">
                    Customer Registration
                </h1>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transform transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default CustomerRegister;

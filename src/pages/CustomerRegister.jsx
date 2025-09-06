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

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const { confirmPassword, ...newUser } = { ...form, role: "customer" };

        if (customers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
            alert("Email already registered!");
            return;
        }

        customers.push(newUser);
        localStorage.setItem("customers", JSON.stringify(customers));
        alert("Customer registered successfully ✅");

        setForm({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 
                       bg-cover bg-center relative transition-colors duration-500"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')`,
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md 
                           p-8 rounded-2xl shadow-xl w-full max-w-md 
                           transition-colors duration-500"
            >
                <h1 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6 drop-shadow-md">
                    Customer Registration
                </h1>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                               rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                               rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                               rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 
                               rounded-xl mb-6 focus:ring-2 focus:ring-blue-400 outline-none transition"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 
                               dark:from-blue-600 dark:to-blue-800 
                               text-white py-3 rounded-xl font-semibold shadow-md 
                               hover:scale-105 transform transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default CustomerRegister;

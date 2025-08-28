import React, { useState } from "react";

function CustomerRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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

        // Get existing users or create empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Add role info
        const newUser = { ...form, role: "customer" };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        alert("Customer registered successfully ✅");

        setForm({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Customer Registration</h1>

                <label className="block text-gray-700 mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-6" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Register</button>
            </form>
        </div>
    );
}

export default CustomerRegister;

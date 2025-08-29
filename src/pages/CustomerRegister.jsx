import React, { useState } from "react";

function CustomerRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { ...form, role: "customer" };

        // Check if email already exists
        if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) {
            alert("Email already registered!");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Customer registered successfully ✅");

        setForm({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Customer Registration</h1>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full px-3 py-2 border rounded-lg mb-6" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Register</button>
            </form>
        </div>
    );
}

export default CustomerRegister;

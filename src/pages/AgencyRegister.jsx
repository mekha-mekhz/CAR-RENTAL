import React, { useState } from "react";

function AgencyRegister() {
    const [form, setForm] = useState({
        agencyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        licenseNumber: "",
        location: "",
        totalVehicles: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !form.agencyName ||
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.licenseNumber ||
            !form.location ||
            !form.totalVehicles
        ) {
            alert("All fields are required!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { ...form, role: "agency" };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Agency registered successfully ✅");

        setForm({
            agencyName: "",
            email: "",
            password: "",
            confirmPassword: "",
            licenseNumber: "",
            location: "",
            totalVehicles: "",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Agency Registration</h1>

                <label className="block text-gray-700 mb-1">Agency Name</label>
                <input name="agencyName" value={form.agencyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">License Number</label>
                <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-4" />

                <label className="block text-gray-700 mb-1">Total Vehicles</label>
                <input name="totalVehicles" type="number" value={form.totalVehicles} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-6" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Register</button>
            </form>
        </div>
    );
}

export default AgencyRegister;

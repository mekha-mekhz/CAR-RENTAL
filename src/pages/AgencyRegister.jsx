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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(form).some(v => !v)) {
            alert("All fields are required!");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const agencies = JSON.parse(localStorage.getItem("agencies")) || [];
        const newAgency = { ...form, role: "agency" };

        if (agencies.some(u => u.email.toLowerCase() === form.email.toLowerCase())) {
            alert("Email already registered!");
            return;
        }

        agencies.push(newAgency);
        localStorage.setItem("agencies", JSON.stringify(agencies));
        alert("Agency registered successfully ✅");

        setForm({ agencyName: "", email: "", password: "", confirmPassword: "", licenseNumber: "", location: "", totalVehicles: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Agency Registration</h1>
                <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="Agency Name" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License Number" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full px-3 py-2 border rounded-lg mb-4" />
                <input name="totalVehicles" type="number" value={form.totalVehicles} onChange={handleChange} placeholder="Total Vehicles" className="w-full px-3 py-2 border rounded-lg mb-6" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Register</button>
            </form>
        </div>
    );
}

export default AgencyRegister;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RentalDashboard() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({ name: "", type: "", price: "", image: "" });

    useEffect(() => {
        const pending = JSON.parse(localStorage.getItem("pendingVehicles")) || [];
        const approved = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
        const rejected = JSON.parse(localStorage.getItem("rejectedVehicles")) || [];

        const allVehicles = [
            ...pending.map(v => ({ ...v, status: "Pending" })),
            ...approved.map(v => ({ ...v, status: "Approved" })),
            ...rejected.map(v => ({ ...v, status: "Rejected" })),
        ];
        setVehicles(allVehicles);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newVehicle = {
            id: Date.now(),
            ...form,
        };

        const pending = JSON.parse(localStorage.getItem("pendingVehicles")) || [];
        pending.push(newVehicle);
        localStorage.setItem("pendingVehicles", JSON.stringify(pending));

        alert("Vehicle submitted for Admin Approval ✅");

        setVehicles([...vehicles, { ...newVehicle, status: "Pending" }]);
        setForm({ name: "", type: "", price: "", image: "" });
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Back to Home Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    ⬅️ Back to Home
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                🚘 Agency Dashboard
            </h1>

            {/* Add Vehicle Form */}
            <div className="mb-8 border p-6 rounded-lg shadow bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    ➕ Add Vehicle
                </h2>
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Vehicle Model"
                        className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="Vehicle Brand"
                        className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price per day"
                        className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Submit Vehicle
                    </button>
                </form>
            </div>

            {/* My Vehicles */}
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                📋 My Vehicles
            </h2>
            {vehicles.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No vehicles submitted yet.</p>
            ) : (
                <table className="w-full border-collapse border text-gray-900 dark:text-gray-100">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => (
                            <tr key={v.id}>
                                <td className="border p-2">
                                    {v.image ? (
                                        <img
                                            src={v.image}
                                            alt={v.name}
                                            className="w-20 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="border p-2">{v.name}</td>
                                <td className="border p-2">{v.type}</td>
                                <td className="border p-2">₹{v.price}</td>
                                <td className="border p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${v.status === "Approved"
                                                ? "bg-green-600"
                                                : v.status === "Rejected"
                                                    ? "bg-red-600"
                                                    : "bg-yellow-600"
                                            }`}
                                    >
                                        {v.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RentalDashboard;

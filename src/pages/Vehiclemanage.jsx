// src/pages/VehicleManagement.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VehicleManagement() {
    const [vehicles, setVehicles] = useState([]);
    const [editVehicle, setEditVehicle] = useState(null);
    const [form, setForm] = useState({
        model: "",
        brand: "",
        price: "",
        image: "",
        available: true,
        location: "",
        supporters: [],
        newSupporter: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const savedVehicles = JSON.parse(localStorage.getItem("approvedVehicles")) || [];
        setVehicles(savedVehicles.reverse());
    }, []);

    const handleEditClick = (vehicle) => {
        setEditVehicle(vehicle.id);
        setForm({
            model: vehicle.model,
            brand: vehicle.brand,
            price: vehicle.price,
            image: vehicle.image,
            available: vehicle.available,
            location: vehicle.location || "",
            supporters: vehicle.supporters || [],
            newSupporter: ""
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            const updated = vehicles.filter(v => v.id !== id);
            setVehicles(updated);
            localStorage.setItem("approvedVehicles", JSON.stringify(updated));
            alert("✅ Vehicle deleted");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleAddSupporter = () => {
        if (form.newSupporter.trim() !== "") {
            setForm(prev => ({
                ...prev,
                supporters: [...prev.supporters, prev.newSupporter.trim()],
                newSupporter: ""
            }));
        }
    };

    const handleRemoveSupporter = (name) => {
        setForm(prev => ({
            ...prev,
            supporters: prev.supporters.filter(s => s !== name)
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedVehicles = vehicles.map(v =>
            v.id === editVehicle
                ? { ...v, ...form, price: Number(form.price) }
                : v
        );
        setVehicles(updatedVehicles);
        localStorage.setItem("approvedVehicles", JSON.stringify(updatedVehicles));

        // Also update filterVehicles to keep location & supporters
        const filterVehicles = JSON.parse(localStorage.getItem("filterVehicles")) || [];
        const index = filterVehicles.findIndex(v => v.id === editVehicle);
        if (index !== -1) {
            filterVehicles[index] = { ...filterVehicles[index], ...form, price: Number(form.price) };
            localStorage.setItem("filterVehicles", JSON.stringify(filterVehicles));
        }

        setEditVehicle(null);
        alert("✅ Vehicle updated");
    };

    const handleSubmitToFilter = (vehicle) => {
        const filterVehicles = JSON.parse(localStorage.getItem("filterVehicles")) || [];
        const exists = filterVehicles.find(v => v.id === vehicle.id);
        if (!exists) {
            localStorage.setItem("filterVehicles", JSON.stringify([vehicle, ...filterVehicles]));
            alert("✅ Vehicle submitted to Filter page");
        } else {
            alert("ℹ Vehicle already in Filter page");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">🚗 Vehicle Management</h1>

            {/* Edit Form */}
            {editVehicle && (
                <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 max-w-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Vehicle</h2>

                    <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} className="w-full p-2 mb-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" required />
                    <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full p-2 mb-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" required />
                    <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 mb-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" required />
                    <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full p-2 mb-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" />
                    <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 mb-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" />

                    <label className="flex items-center mb-3 gap-2 text-gray-800 dark:text-gray-200">
                        <input type="checkbox" name="available" checked={form.available} onChange={handleChange} className="w-4 h-4" /> Available
                    </label>

                    {/* Supporters */}
                    <div className="mb-3">
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-1">Supporters / Mechanics:</h3>
                        <div className="flex gap-2 mb-2">
                            <input type="text" name="newSupporter" value={form.newSupporter} placeholder="Add supporter" onChange={handleChange} className="flex-1 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white" />
                            <button type="button" onClick={handleAddSupporter} className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.supporters.map(s => (
                                <span key={s} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded flex items-center gap-1">
                                    {s}
                                    <button type="button" onClick={() => handleRemoveSupporter(s)} className="text-red-600 dark:text-red-400 font-bold">&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600">Update</button>
                        <button type="button" onClick={() => setEditVehicle(null)} className="bg-gray-600 dark:bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="button" onClick={() => handleSubmitToFilter(form)} className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600">Submit to Filter</button>
                    </div>
                </form>
            )}

            {/* Vehicles List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vehicles.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-300">No vehicles available.</p>
                ) : (
                    vehicles.map(v => (
                        <div key={v.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden p-4 flex flex-col justify-between">
                            <img src={v.image || "https://via.placeholder.com/300x200"} alt={v.model} className="w-full h-40 object-cover mb-3 rounded" />
                            <div className="mb-3">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{v.model}</h3>
                                <p className="text-gray-600 dark:text-gray-300">Brand: {v.brand}</p>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">${v.price}</p>
                                <p className={`mt-1 font-medium ${v.available ? "text-green-600" : "text-red-600"}`}>
                                    {v.available ? "Available" : "Not Available"}
                                </p>
                                <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">Location: {v.location || "N/A"}</p>
                                {v.supporters && v.supporters.length > 0 && (
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Supporters: {v.supporters.join(", ")}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(v)} className="flex-1 bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white py-2 rounded hover:bg-yellow-600 dark:hover:bg-yellow-500">Edit</button>
                                <button onClick={() => handleDelete(v.id)} className="flex-1 bg-red-600 dark:bg-red-700 text-white py-2 rounded hover:bg-red-700 dark:hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default VehicleManagement;

import React, { useState } from "react";

function RentalDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        type: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddVehicle = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.image || !formData.price) return;

        setVehicles([...vehicles, formData]);
        setFormData({ name: "", image: "", price: "", type: "" });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Rental Dashboard</h1>

            {/* Add Vehicle Form */}
            <form onSubmit={handleAddVehicle} className="mb-6 space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Vehicle Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Rental Price / Day"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Vehicle Type (Car, Bike...)"
                    value={formData.type}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Vehicle
                </button>
            </form>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicles.map((v, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded shadow flex flex-col items-center"
                    >
                        <img src={v.image} alt={v.name} className="w-full h-40 object-cover mb-2 rounded" />
                        <h2 className="font-bold">{v.name}</h2>
                        <p>Type: {v.type}</p>
                        <p>Price: ₹{v.price} / day</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RentalDashboard;

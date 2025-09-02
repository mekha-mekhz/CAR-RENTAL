// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalBookings: 0,
        totalCustomers: 0,
        totalAgencies: 0,
    });

    useEffect(() => {
        setPending(JSON.parse(localStorage.getItem("pendingVehicles")) || []);
        setApproved(JSON.parse(localStorage.getItem("approvedVehicles")) || []);
        setRejected(JSON.parse(localStorage.getItem("rejectedVehicles")) || []);

        setStats({
            totalVehicles: (JSON.parse(localStorage.getItem("approvedVehicles")) || []).length,
            totalBookings: (JSON.parse(localStorage.getItem("bookings")) || []).length,
            totalCustomers: (JSON.parse(localStorage.getItem("customers")) || []).length,
            totalAgencies: (JSON.parse(localStorage.getItem("agencies")) || []).length,
        });
    }, []);

    const updateStats = (vehicleCount) => {
        setStats(prev => ({ ...prev, totalVehicles: vehicleCount }));
    };

    const handleApprove = (vehicle) => {
        const updatedPending = pending.filter(v => v.id !== vehicle.id);
        setPending(updatedPending);
        localStorage.setItem("pendingVehicles", JSON.stringify(updatedPending));

        const approvedVehicle = {
            id: vehicle.id,
            model: vehicle.name,
            brand: vehicle.type,
            price: vehicle.price,
            image: vehicle.image || "https://via.placeholder.com/300x200",
            available: true,
            newBadge: true,
        };

        const updatedApproved = [...approved, approvedVehicle];
        setApproved(updatedApproved);
        localStorage.setItem("approvedVehicles", JSON.stringify(updatedApproved));

        alert("✅ Vehicle Approved");
        updateStats(updatedApproved.length);

        // Navigate to Vehicle Management page
        navigate("/vehicle-management", { state: { message: "Vehicle approved successfully!" } });
    };

    const handleReject = (vehicle) => {
        const updatedPending = pending.filter(v => v.id !== vehicle.id);
        setPending(updatedPending);
        localStorage.setItem("pendingVehicles", JSON.stringify(updatedPending));

        const updatedRejected = [...rejected, vehicle];
        setRejected(updatedRejected);
        localStorage.setItem("rejectedVehicles", JSON.stringify(updatedRejected));

        alert("❌ Vehicle Rejected");
    };

    const renderTable = (list, type) => (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {type} Vehicles ({list.length})
            </h2>
            {list.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No {type.toLowerCase()} vehicles.</p>
            ) : (
                <table className="w-full border-collapse border text-gray-800 dark:text-gray-200">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Price</th>
                            {type === "Pending" && <th className="border p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((v) => (
                            <tr key={v.id} className="border-b border-gray-300 dark:border-gray-600">
                                <td className="border p-2">{v.name}</td>
                                <td className="border p-2">{v.type}</td>
                                <td className="border p-2">₹{v.price}</td>
                                {type === "Pending" && (
                                    <td className="border p-2 flex gap-2">
                                        <button
                                            onClick={() => handleApprove(v)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(v)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">🛠 Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Vehicles</h2>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalVehicles}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Bookings</h2>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalBookings}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Customers</h2>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalCustomers}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Agencies</h2>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.totalAgencies}</p>
                </div>
            </div>

            {/* Pending, Approved, Rejected Tables */}
            {renderTable(pending, "Pending")}
            {renderTable(approved, "Approved")}
            {renderTable(rejected, "Rejected")}
        </div>
    );
}

export default AdminDashboard;

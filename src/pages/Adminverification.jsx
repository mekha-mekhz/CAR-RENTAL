// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

function AdminDashboard() {
    const [pendingVehicles, setPendingVehicles] = useState([]);
    const [approvedVehicles, setApprovedVehicles] = useState([]);
    const [rejectedVehicles, setRejectedVehicles] = useState([]);

    const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
    const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
    const [pendingComplaints, setPendingComplaints] = useState([]);
    const [approvedComplaints, setApprovedComplaints] = useState([]);

    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalBookings: 0,
        totalCustomers: 0,
        totalAgencies: 0,
    });

    // Load from localStorage
    const loadData = () => {
        setPendingVehicles(JSON.parse(localStorage.getItem("pendingVehicles")) || []);
        setApprovedVehicles(JSON.parse(localStorage.getItem("approvedVehicles")) || []);
        setRejectedVehicles(JSON.parse(localStorage.getItem("rejectedVehicles")) || []);

        setPendingFeedbacks(JSON.parse(localStorage.getItem("pendingFeedbacks")) || []);
        setApprovedFeedbacks(JSON.parse(localStorage.getItem("approvedFeedbacks")) || []);

        setPendingComplaints(JSON.parse(localStorage.getItem("pendingComplaints")) || []);
        setApprovedComplaints(JSON.parse(localStorage.getItem("approvedComplaints")) || []);

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const agencies = JSON.parse(localStorage.getItem("agencies")) || [];

        setStats({
            totalVehicles: (JSON.parse(localStorage.getItem("approvedVehicles")) || []).length,
            totalBookings: bookings.length,
            totalCustomers: customers.length,
            totalAgencies: agencies.length,
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    // Generic Approve / Reject handler
    const handleApprove = (item, type) => {
        if (type === "vehicle") {
            const updatedPending = pendingVehicles.filter(v => v.id !== item.id);
            setPendingVehicles(updatedPending);
            localStorage.setItem("pendingVehicles", JSON.stringify(updatedPending));

            const updatedApproved = [...approvedVehicles, item];
            setApprovedVehicles(updatedApproved);
            localStorage.setItem("approvedVehicles", JSON.stringify(updatedApproved));
        } else if (type === "feedback") {
            const updatedPending = pendingFeedbacks.filter(f => f.id !== item.id);
            setPendingFeedbacks(updatedPending);
            localStorage.setItem("pendingFeedbacks", JSON.stringify(updatedPending));

            const updatedApproved = [...approvedFeedbacks, item];
            setApprovedFeedbacks(updatedApproved);
            localStorage.setItem("approvedFeedbacks", JSON.stringify(updatedApproved));
        } else if (type === "complaint") {
            const updatedPending = pendingComplaints.filter(c => c.id !== item.id);
            setPendingComplaints(updatedPending);
            localStorage.setItem("pendingComplaints", JSON.stringify(updatedPending));

            const updatedApproved = [...approvedComplaints, item];
            setApprovedComplaints(updatedApproved);
            localStorage.setItem("approvedComplaints", JSON.stringify(updatedApproved));
        }
        alert("✅ Approved successfully");
    };

    const handleReject = (item, type) => {
        if (type === "vehicle") {
            const updatedPending = pendingVehicles.filter(v => v.id !== item.id);
            setPendingVehicles(updatedPending);
            localStorage.setItem("pendingVehicles", JSON.stringify(updatedPending));

            const updatedRejected = [...rejectedVehicles, item];
            setRejectedVehicles(updatedRejected);
            localStorage.setItem("rejectedVehicles", JSON.stringify(updatedRejected));
        } else {
            // For now, just remove from pending if rejected
            if (type === "feedback") {
                const updatedPending = pendingFeedbacks.filter(f => f.id !== item.id);
                setPendingFeedbacks(updatedPending);
                localStorage.setItem("pendingFeedbacks", JSON.stringify(updatedPending));
            }
            if (type === "complaint") {
                const updatedPending = pendingComplaints.filter(c => c.id !== item.id);
                setPendingComplaints(updatedPending);
                localStorage.setItem("pendingComplaints", JSON.stringify(updatedPending));
            }
        }
        alert("❌ Rejected");
    };

    const renderFeedbacks = (list, type) => (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {type} Feedbacks ({list.length})
            </h2>
            {list.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No {type.toLowerCase()} feedbacks.</p>
            ) : (
                <table className="w-full border-collapse border text-gray-800 dark:text-gray-200">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Message</th>
                            {type === "Pending" && <th className="border p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((f) => (
                            <tr key={f.id}>
                                <td className="border p-2">{f.name}</td>
                                <td className="border p-2">{f.message}</td>
                                {type === "Pending" && (
                                    <td className="border p-2 flex gap-2">
                                        <button onClick={() => handleApprove(f, "feedback")}
                                            className="bg-green-600 text-white px-3 py-1 rounded">
                                            Approve
                                        </button>
                                        <button onClick={() => handleReject(f, "feedback")}
                                            className="bg-red-600 text-white px-3 py-1 rounded">
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

    const renderComplaints = (list, type) => (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {type} Complaints ({list.length})
            </h2>
            {list.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No {type.toLowerCase()} complaints.</p>
            ) : (
                <table className="w-full border-collapse border text-gray-800 dark:text-gray-200">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Complaint</th>
                            {type === "Pending" && <th className="border p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((c) => (
                            <tr key={c.id}>
                                <td className="border p-2">{c.name}</td>
                                <td className="border p-2">{c.message}</td>
                                {type === "Pending" && (
                                    <td className="border p-2 flex gap-2">
                                        <button onClick={() => handleApprove(c, "complaint")}
                                            className="bg-green-600 text-white px-3 py-1 rounded">
                                            Approve
                                        </button>
                                        <button onClick={() => handleReject(c, "complaint")}
                                            className="bg-red-600 text-white px-3 py-1 rounded">
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

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Vehicles</h2>
                    <p className="text-3xl font-bold">{stats.totalVehicles}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Bookings</h2>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Customers</h2>
                    <p className="text-3xl font-bold">{stats.totalCustomers}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Agencies</h2>
                    <p className="text-3xl font-bold">{stats.totalAgencies}</p>
                </div>
            </div>

            {/* Vehicles Section */}
            {renderTable(pendingVehicles, "Pending")}
            {renderTable(approvedVehicles, "Approved")}
            {renderTable(rejectedVehicles, "Rejected")}

            {/* Feedbacks Section */}
            {renderFeedbacks(pendingFeedbacks, "Pending")}
            {renderFeedbacks(approvedFeedbacks, "Approved")}

            {/* Complaints Section */}
            {renderComplaints(pendingComplaints, "Pending")}
            {renderComplaints(approvedComplaints, "Approved")}
        </div>
    );

    // vehicle table render
    function renderTable(list, type) {
        return (
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{type} Vehicles ({list.length})</h2>
                {list.length === 0 ? (
                    <p>No {type.toLowerCase()} vehicles.</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Price</th>
                                {type === "Pending" && <th className="border p-2">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(v => (
                                <tr key={v.id}>
                                    <td className="border p-2">{v.name}</td>
                                    <td className="border p-2">{v.type}</td>
                                    <td className="border p-2">₹{v.price}</td>
                                    {type === "Pending" && (
                                        <td className="border p-2 flex gap-2">
                                            <button onClick={() => handleApprove(v, "vehicle")} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                                            <button onClick={() => handleReject(v, "vehicle")} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default AdminDashboard;

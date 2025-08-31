import React, { useEffect, useState } from "react";

function AdminDashboard() {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [rejected, setRejected] = useState([]);

    useEffect(() => {
        setPending(JSON.parse(localStorage.getItem("pendingVehicles")) || []);
        setApproved(JSON.parse(localStorage.getItem("approvedVehicles")) || []);
        setRejected(JSON.parse(localStorage.getItem("rejectedVehicles")) || []);
    }, []);

    const handleApprove = (vehicle) => {
        const updatedPending = pending.filter(v => v.id !== vehicle.id);
        setPending(updatedPending);
        localStorage.setItem("pendingVehicles", JSON.stringify(updatedPending));

        const updatedApproved = [...approved, vehicle];
        setApproved(updatedApproved);
        localStorage.setItem("approvedVehicles", JSON.stringify(updatedApproved));

        alert("✅ Vehicle Approved");
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
            <h2 className="text-xl font-semibold mb-3">
                {type} Vehicles ({list.length})
            </h2>
            {list.length === 0 ? (
                <p>No {type.toLowerCase()} vehicles.</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Price</th>
                            {type === "Pending" && <th className="border p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((v) => (
                            <tr key={v.id}>
                                <td className="border p-2">{v.name}</td>
                                <td className="border p-2">{v.type}</td>
                                <td className="border p-2">₹{v.price}</td>
                                {type === "Pending" && (
                                    <td className="border p-2 flex gap-2">
                                        <button
                                            onClick={() => handleApprove(v)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(v)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h1>

            {/* Pending */}
            {renderTable(pending, "Pending")}

            {/* Approved */}
            {renderTable(approved, "Approved")}

            {/* Rejected */}
            {renderTable(rejected, "Rejected")}
        </div>
    );
}

export default AdminDashboard;

// src/components/ApprovedFeedbacksComplaints.jsx
import React, { useEffect, useState } from "react";

function ApprovedFeedbacksComplaints() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const approvedFeedbacks = JSON.parse(localStorage.getItem("approvedFeedbacks")) || [];
        const approvedComplaints = JSON.parse(localStorage.getItem("approvedComplaints")) || [];

        setFeedbacks(approvedFeedbacks);
        setComplaints(approvedComplaints);
    }, []);

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md my-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🌟 Customer Feedbacks</h2>
            {feedbacks.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No feedbacks yet.</p>
            ) : (
                <ul className="space-y-3">
                    {feedbacks.map(f => (
                        <li key={f.id} className="p-3 bg-white dark:bg-gray-700 rounded shadow">
                            <p className="italic text-gray-700 dark:text-gray-300">"{f.message}"</p>
                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">— {f.name}</p>
                        </li>
                    ))}
                </ul>
            )}

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">⚠️ Customer Complaints</h2>
            {complaints.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No complaints yet.</p>
            ) : (
                <ul className="space-y-3">
                    {complaints.map(c => (
                        <li key={c.id} className="p-3 bg-red-50 dark:bg-gray-700 rounded shadow">
                            <p className="text-gray-800 dark:text-gray-200">{c.message}</p>
                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">— {c.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ApprovedFeedbacksComplaints;

import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/Themecontext";

function AgencyRegister() {
    const { theme } = useContext(ThemeContext);

    const [form, setForm] = useState({
        agencyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        licenseNumber: "",
        location: "",
        totalVehicles: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(form).some((v) => !v)) {
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
        <div
            className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                }`}
        >
            <form
                onSubmit={handleSubmit}
                className={`p-8 rounded-lg shadow-lg w-96 transition-colors duration-300
                    ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Agency Registration
                </h1>

                {[
                    "agencyName",
                    "email",
                    "password",
                    "confirmPassword",
                    "licenseNumber",
                    "location",
                    "totalVehicles",
                ].map((field, i) => (
                    <input
                        key={i}
                        name={field}
                        type={
                            field === "password" || field === "confirmPassword"
                                ? "password"
                                : field === "email"
                                    ? "email"
                                    : field === "totalVehicles"
                                        ? "number"
                                        : "text"
                        }
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        className={`w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 transition-colors duration-300
                            ${theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                            }`}
                    />
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default AgencyRegister;

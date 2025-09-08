import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 p-6 relative overflow-hidden">

            {/* Confetti emojis floating */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, idx) => (
                    <span
                        key={idx}
                        className={`absolute text-2xl animate-fall`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        🎉✨❤️
                    </span>
                ))}
            </div>

            <div className="bg-white/80 dark:bg-black/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center animate-bounceIn">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-500 mb-6 animate-pulse">
                    🎉 Thank You! 🎉
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-4">
                    You chose <span className="font-bold text-blue-500">FastLane</span> 🚗
                </p>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Wishing you a smooth and happy journey! 😄✨
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-lg transition transform hover:scale-105"
                >
                    Go to Homepage
                </button>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
                }
                .animate-fall {
                    animation: fall 5s linear infinite;
                }

                @keyframes bounceIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    60% { transform: scale(1.05); opacity: 1; }
                    80% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
                .animate-bounceIn {
                    animation: bounceIn 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default ThankYou;

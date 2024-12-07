'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    // State management for form inputs and error handling
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); // Router instance for navigation

    // Event handlers
    const handleSignup = async (e) => {
        e.preventDefault();
        // Validation
        if (!username || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        try {
            // Simulate signup logic (replace with actual API call)
            const response = await fakeSignupAPI({ username, password });
            if (response.success) {
                console.log("Sign up successful:", { username });
                // Redirect to login page
                router.push("/login");
            } else {
                setError(response.message || "Signup failed");
            }
        } catch (err) {
            setError("An error occurred during signup");
            console.error(err);
        }
    };

    const handleLogin = () => {
        // Optional: Add login logic if separate from signup
        console.log("Login clicked");
    };

    // Mock API function (replace with real API call)
    const fakeSignupAPI = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    };

    return (
        <div className="absolute bg-white top-[70px] left-[50%] transform -translate-x-1/2 w-[40%] h-auto p-6 flex flex-col justify-center rounded shadow z-10">
            <h2 className="text-center mb-4 text-2xl font-bold text-purple-700">Welcome to myBIZ</h2>
            <form className="w-full p-6 flex flex-col space-y-2" onSubmit={handleSignup}>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <label htmlFor="username" className="text-base text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="password" className="text-base text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="confirmPassword" className="text-base text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-center">
                <a href="#" className="text-blue-500">Forgot Password?</a>
                <span className="mx-2">|</span>
                <a href="#" className="text-blue-500">Create Account</a>
            </div>
        </div>
    );
};

export default SignUpPage;

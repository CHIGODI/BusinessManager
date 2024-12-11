'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
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
            const res = await fetch('http://localhost:8000/api/token/')
            console.log(res)

        } catch (error) {
            console.log(e)
        }

    };



    return (
        <div className="h-screen
                        flex flex-col
                        items-center
                        "
        >
            <form className="bg-white
                            p-6 flex
                            flex-col
                            space-y-2
                            w-[90%]
                            justify-between
                            h-[90%]
                            md:h-auto
                            mt-[10%]
                            md:mt-[2.5%]
                            md:w-1/3
                            rounded-md shadow-md
                            "
                onSubmit={handleSignup}
            >
                <header className="
                                text-center mb-4
                                text-2xl font-bold
                                text-purple-700"
                >
                   Welcome Back!
                </header>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <label htmlFor="username" className="text-gray-700 text-sm md:text-base">
                    Username
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm md:text-base"
                    required
                />
                <label htmlFor="password" className="text-gray-700 text-sm md:text-base">
                    Password
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm md:text-base"
                    required
                />
                <label htmlFor="confirmPassword" className="text-gray-700 text-sm md:text-base">
                    Confirm Password
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm md:text-base"
                    required
                />
                <button
                    type="submit"
                    className="w-full
                                py-3 bg-purple-700
                                text-white rounded-lg
                                hover:bg-purple-600
                                focus:outline-none focus:ring-2
                                focus:ring-purple-500
                                text-sm
                                md:text-base

                                "
                >
                    Sign Up
                </button>
                <div className="text-center flex flex-col">
                    <Link href="/signup" className="text-blue-500 text-sm">Don't have an account? SignUp</Link>
                    <Link href="/login" className="text-blue-500 text-sm">Forgot Password</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

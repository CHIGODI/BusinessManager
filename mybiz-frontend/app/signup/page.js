'use client';
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword || !email) {
            toast.error('All fields are required!');
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const data = {
            'email': email,
            'username': username,
            'password': password
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/account/register/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 201){
                toast.success('Account created successfully');
                router.push('/login');
            };
        } catch (error) {
            if (error.response.data.username && error.response.data.email) {
                toast.error(error.response.data.username[0]);
            } else if (error.response.data.email) {
                toast.error(error.response.data.email[0]);
            }   else {
                toast.error("An error occurred. Please try again later.");
            }
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
                    Get Started with myBIZ
                </header>
                <label htmlFor="email" className="text-gray-700 text-sm md:text-base">
                    Email
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`p-2 border
                               border-gray-300
                                rounded text-sm
                                md:text-base
                                `}
                />
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
                    className={`p-2 border
                               border-gray-300
                               rounded text-sm
                               md:text-base
                               `}
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
                    className={`p-2 border
                               border-gray-300
                               rounded text-sm
                               md:text-base
                               `}
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
                    className={`p-2 border
                               border-gray-300
                               rounded text-sm
                               md:text-base
                               `}
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
                <div className="text-center">
                    <Link href="/login" className="text-blue-500 text-sm hover:underline hover:text-[#E73879] md:text-base">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
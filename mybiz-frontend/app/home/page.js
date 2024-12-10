'use client';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation'

export default function LandingPage({ pathname }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const formRef = useRef(null);


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/account/login/",
                {
                    'username': username,
                    'password': password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Login successful:", response.data);
            redirect('/Dashboard');
        } catch (error) {
            console.error("Error during login:", error.response || error.message);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };

    const closeLoginForm = () => {
        setIsFormVisible(false);
        setError('');
        setUsername('');
        setPassword('');
    };

    // Handle clicks outside the form to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsFormVisible(false);
            }
        };

        if (isFormVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFormVisible]);

    const isActive = (href) => pathname === href;

    return (
        <div className="h-screen ml-[5%] mr-[5%]">
            {/* Apply blur only to the background when login form is active */}
            <div className={`absolute inset-0  ${isFormVisible ? 'bg-black bg-opacity-50' : ''}`}>
                {/* Background content goes here */}
            </div>
            <nav className="relative h-[70px] flex items-center justify-between">
                <div className="w-[50%] Logo">
                    <h1 className="text-purple-800">myBIZ</h1>
                </div>
                <ul className="w-[50%] flex items-center justify-around">
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}>
                        <Link href="/Home">Home</Link>
                    </li>
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}>
                        <Link href="/dashboard">Our Services</Link>
                    </li>
                    <li className={`relative ${isActive('/Home') ? 'text-purple-500' : ''}`}>
                        <Link href="/dashboard">About Us</Link>
                    </li>
                    <li>
                        <Link href="/SignUp">
                            <button className="w-[120px] border border-purple-500 text-purple-500 py-2 px-4 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
                                SignUp
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsFormVisible(true)}
                            className="w-[120px] bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-500 transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </li>
                    {/* Login form */}
                    {isFormVisible && (
                        <div
                            ref={formRef}
                            className="absolute bg-white top-[70px] left-[50%] transform -translate-x-1/2 w-[40%] h-auto p-6 flex flex-col justify-center rounded shadow z-10"
                        >
                            <span
                                className="absolute top-0 right-0 p-4 cursor-pointer rounded"
                                onClick={closeLoginForm}
                            >
                                X
                            </span>
                            <h2 className="text-center mb-4 text-2xl font-bold text-purple-700">Welcome Back</h2>
                            <form className="w-full p-6 flex flex-col space-y-2" onSubmit={handleLogin}>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <label htmlFor="email" className="text-base text-gray-700">Username</label>
                                <input
                                    type="username"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <label htmlFor="password" className="text-base text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    Login
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <a href="#" className="text-blue-500">Forgot Password?</a>
                                <span className="mx-2">|</span>
                                <a href="#" className="text-blue-500">Create Account</a>
                            </div>
                        </div>
                    )}
                </ul>
            </nav>
            <main className="flex flex-row md:flex-row justify-between px-8 py-16 gap-10">
                <div className="md:w-1/2 flex flex-col items-center mt-[8%] text-center">
                    <h2 className="text-4xl font-bold text-[#001F3F] pb-4 ">
                        Think, plan and track all in one place
                    </h2>
                    <p className="text-lg text-[#31363F] pb-4">
                        Efficiently manage your business and boost productivity.
                    </p>
                    <button className="bg-purple-600 text-white px-3 py-3 text-lg rounded hover:bg-blue-700 w-1/2">
                        Get started
                    </button>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src="/Images/Landing2.jpg"
                        alt="ChronoTask Dashboard"
                        className="rounded-lg"
                    />
                </div>
            </main>
            <section className="services">
            </section>
            <footer>
            </footer>
        </div>
    );
}

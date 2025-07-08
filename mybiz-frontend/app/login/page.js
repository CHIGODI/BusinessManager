'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [ signin, setSigningin ] = useState('Sign In');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        setError("");
        setSigningin('Signing in...');
        const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });
        if (res?.error) {
            setError("Invalid username or password");
        } else {
            const session = await fetch('/api/auth/session').then((res) => res.json());
            if (session?.user) {
                const dashboardRoute = session.user.is_staff ? "/admin/dashboard" : "/user/dashboard";

                toast.success("Login successful");
                router.push(dashboardRoute);
            } else {
                setError("Please try again");
                router.push("/login");
            }
        }
        setSigningin('Sign In');
    };

    return (
        <div className="h-screen
                        flex flex-row
                        items-center
                        bg-green-200
                        "
        >
            <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            w-full
                            lg:w-1/2
                            h-full
                            m-auto">
                <h2 className="text-center text-green-500 font-bold pb-4">NDEWA AGROVET MAZERAS</h2>
                <div className="w-[90%] lg:w-[70%]
                                h-[60%]
                                p-8
                                shadow-md
                                bg-green-600
                                ">
                    <header className="
                                text-center mb-4
                                text-2xl font-bold
                                text-white"
                    >
                        Welcome Back!
                    </header>
                    <form className="flex flex-col

                            "
                        onSubmit={handleLogin}
                    >

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <label htmlFor="username" className="text-gray-300 text-base">
                            Username
                            <span className="text-red-400 p-1">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 border border-gray-300 text-base outline-none focus:outline-gray-400"
                            required
                        />
                        <label htmlFor="password" className="text-gray-300 text-base pt-4">
                            Password
                            <span className="text-red-400 p-1">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border border-gray-300  text-base outline-none focus:outline-gray-400"                            required
                        />
                        <button
                            type="submit"
                            className="w-full
                                my-4
                                py-3 bg-green-950
                                text-white -lg
                                hover:bg-opacity[90%]
                                focus:outline-none focus:ring-2
                                focus:ring-green-500
                                text-sm
                                md:text-base
                                hover:shadow-lg
                                hover:bg-green-900
                                transition duration-300
                                ease-in-out
                                disabled:opacity-50 disabled:cursor-not-allowed
                                ">
                            {signin}
                        </button>
                        {/* <div className="text-center flex flex-row justify-center gap-2">
                            <Link href="/signup" className="text-blue-500 text-sm hover:underline">Create Account</Link>
                            <span className="text-gray-500 text-sm">|</span>
                            <Link href="/login" className="text-blue-500 text-sm hover:underline">Forgot Password</Link>
                        </div> */}
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;

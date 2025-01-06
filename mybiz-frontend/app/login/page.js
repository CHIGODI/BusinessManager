'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [ signin, setSigningin ] = useState('Sign In');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

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

            if (session?.user?.role) {
                console.log("User role:", session.user.role);

                // Determine the dashboard route based on the user's role
                const dashboardRoute = session.user.role === "admin"
                    ? "/admin/dashboard"
                    : "/user/dashboard";

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
                            h-[70%]
                            m-auto
                            md:mt-[2.5%]
                            md:w-1/3
                            rounded-md shadow-md
                            "
                onSubmit={handleLogin}
            >
                <header className="
                                text-center mb-4
                                text-2xl font-bold
                                text-purple-700"
                >
                   Welcome Back!
                </header>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <label htmlFor="username" className="text-gray-700 text-base">
                    Username
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-4 border border-gray-300 rounded text-base"
                    required
                />
                <label htmlFor="password" className="text-gray-700 text-base">
                    Password
                    <span className="text-red-400 p-1">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-4 border border-gray-300 rounded text-base"
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
                                ">
                    {signin}
                </button>
                <div className="text-center flex flex-row justify-center gap-2">
                    <Link href="/signup" className="text-blue-500 text-sm hover:underline">Create Account</Link>
                    <span className="text-gray-500 text-sm">|</span>
                    <Link href="/login" className="text-blue-500 text-sm hover:underline">Forgot Password</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

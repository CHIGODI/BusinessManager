'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [signin, setSigningin] = useState('Sign In');
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let newError = {};
        if (!formData.username) newError.username = "Username is required";
        if (!formData.password) newError.password = "Password is required";
        setError(newError);
        if (Object.keys(newError).length) return;

        setSigningin('Signing in...');
        const res = await signIn('credentials', {
            redirect: false,
            username: formData.username,
            password: formData.password,
        });

        if (res?.error) {
            setError({ general: "Invalid username or password" });
        } else {
            const session = await fetch('/api/auth/session').then(res => res.json());
            if (session?.user) {
                const dashboardRoute = session.user.is_staff ? "/admin/dashboard" : "/user/dashboard";
                toast.success("Login successful");
                router.push(dashboardRoute);
            } else {
                setError({ general: "Please try again" });
            }
        }
        setSigningin('Sign In');
    };

    return (
        <div className="h-screen flex items-center bg-gray-200">
            <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-full m-auto ">
                <div className="w-[100%] lg:w-[70%] h-[60%] p-8 shadow-md lg:rounded-xl  bg-gradient-to-t from-green-100 to-green-900">
                    <header className="text-center mb-4 text-2xl font-bold text-white">
                        Welcome Back!
                    </header>
                    <form onSubmit={handleLogin} className="flex flex-col">
                        {error.general && <p className="text-red-500 text-sm mb-2">{error.general}</p>}

                        {['username', 'password'].map((field) => (
                            <div className="mb-4" key={field}>
                                <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                    <span className="text-red-500"> *</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id={field}
                                        name={field}
                                        type={field === 'password' && !showPassword ? 'password' : 'text'}
                                        placeholder={field === 'username' ? 'e.g Ndewa' : '**********'}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="appearance-none border-b w-full py-3 px-3 text-gray-600 text-sm placeholder:text-sm placeholder:font-light
                                                   focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
                                        required
                                    />
                                    {field === 'password' && (
                                        <span
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={handleTogglePassword}
                                        >
                                            <FontAwesomeIcon
                                                className="text-sm"
                                                icon={showPassword ? faEye : faEyeSlash}
                                            />
                                        </span>
                                    )}
                                </div>
                                {error[field] && <p className="text-red-500 text-xs italic">{error[field]}</p>}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full my-4 py-3 bg-[#0F5132] text-white rounded-md hover:bg-opacity-90
                                       focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base
                                       hover:shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {signin}
                        </button>

                        <div className="text-center flex flex-row justify-center gap-2">
                            <Link href="/signup" className="text-blue-700 text-sm hover:underline">Create Account</Link>
                            <span className="text-gray-500 text-sm">|</span>
                            <Link href="/login" className="text-blue-700 text-sm hover:underline">Forgot Password</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

'use client';
import React, { useState } from "react";
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../components/SideNav";

const SettingsPage = () => {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState("My Details");

    // Tab content mapping
    const renderContent = () => {
        switch (activeTab) {
            case "My Details":
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-600">My Details</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Manage your personal information and preferences here.
                        </p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Username</label>
                                <input
                                    type="text"
                                    placeholder="JohnDoe"
                                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                />
                            </div>
                        </div>
                        <button className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600">
                            Save Changes
                        </button>
                    </div>
                );
            case "Profile":
                return <p className="text-gray-600">Profile settings content goes here.</p>;
            case "Password":
                return <p className="text-gray-600">Password change content goes here.</p>;
            case "Notifications":
                return <p className="text-gray-600">Notification preferences content goes here.</p>;
            default:
                return <p className="text-gray-600">Select a tab to view its content.</p>;
        }
    };

    return (
        <div className="h-screen">
            {/* Navbar */}
            <NavBar />

            {/* Main Container */}
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                {/* Sidebar */}
                <SideNav />

                {/* Settings Content */}
                <div className="w-full md:w-[80%] px-[2%] py-[2%] h-full flex flex-col gap-4 bg-gray-50">

                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl text-gray-700 pt-4 pl-4">Settings</h2>
                    </div>

                    {/* Content Section */}
                    <div className="border h-full shadow-sm rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full
                                    scrollbar-track-gray-100 scrollbar-thumb-gray-400 bg-white p-6">

                        {/* Tabs Section */}
                        <div className="flex flex-row gap-6 border-b border-gray-200 pb-4">
                            {["My Details", "Profile", "Password", "Notifications"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-medium ${activeTab === tab
                                            ? "text-gray-700 border-b-2 border-indigo-500"
                                            : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">{renderContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

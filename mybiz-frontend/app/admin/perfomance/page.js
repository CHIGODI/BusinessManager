// 'use client' directive
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../components/SideNav";
import KeyMetrics from "./components/KeyMetrics";
import ProductPerformance from "./components/ProductsPerformance";

const Perfomance = () => {
    const [activeTab, setActiveTab] = useState("metrics");

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-full lg:w-[80%] px-[2%] py-[2%] h-full bg-[#F8FAFC] overflow-y-auto">
                    <div className="">
                        <div className="flex-1">
                            <h1 className="font-bold text-lg text-gray-600 pt-4">Performance Metrics</h1>
                            <p className="text-xs text-gray-500">View your business performance metrics</p>
                        </div>
                        <div className="flex gap-4 border-b border-gray-200 mt-4">
                            {[
                                { id: "metrics", label: "Key Metrics" },
                                { id: "products", label: "Products Performance" },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-2 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? "border-b-2 border-orange-500 text-orange-600"
                                            : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <>
                        {activeTab === "metrics" && (
                            <KeyMetrics />
                        )}
                        {activeTab === "products" && (
                            <ProductPerformance  />
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Perfomance;
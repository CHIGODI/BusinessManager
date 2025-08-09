'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "@/app/sharedComponents/SideNav";
import { set } from "date-fns";

const Summary = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [mpesa, setMpesa] = useState(0);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const [allSales, totalSales] = await Promise.all([
                    axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/analytics/performance/summary/`,
                        {
                            headers: {
                                "Authorization": `Bearer ${session?.user?.access}`,
                            }
                        }),
                    axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/analytics/sales/`,
                        {
                            headers: {
                                "Authorization": `Bearer ${session?.user?.access}`,
                            },
                            params: {
                                start_date: new Date().toISOString().split('T')[0],
                                end_date: new Date().toISOString().split('T')[0],
                            }
                        }
                    )
                ]);
                setMpesa(allSales.data.period.mpesa_sales.toLocaleString() || 0.0);
                if (totalSales.data.total_sales_for_period.total_sales) {
                    setTotalSales(totalSales.data.total_sales_for_period.total_sales.toLocaleString());
                }
                else {
                    setTotalSales(0);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                toast.error('No sales found, or refresh the page');
                setIsLoading(false);
            }
        };

        if (session) {
            fetchSales();
        }
    }, [session]);
    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full bg-[#F8FAFC]  flex flex-row flex-wrap gap-4">
                    <div className="border bg-white shadow-sm rounded-xl h-1/4 w-1/4">
                        <div className="p-4 ">
                            <p className="pb-2 text-xs text-gray-400">Today's Total</p>
                            <h2 className="text-xl text-orange-500 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{totalSales}
</h2>
                        </div>  
                    </div>
                    <div className="border bg-white shadow-sm rounded-xl h-1/4 w-1/4">
                        <div className="p-4 ">
                            <p className="pb-2 text-xs text-gray-400">Mpesa Sales</p>
                            <h2 className="text-xl text-green-500 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{`${mpesa}`}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Summary;
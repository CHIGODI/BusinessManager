'use client';
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';


const Perfomance = () => {
        const [isLoading, setIsLoading] = useState(true);
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const [salesData, setSalesData] = useState({
            today: {
                profit: 0.00,
                total_revenue: 0.00,
                items_sold: 0
            },
            yesterday: {
                profit: 0.00,
                total_revenue: 0.00,
                items_sold: 0
            }
        });

        const { data: session } = useSession();
        const fetchSales = async (start = '', end = '') => {
            setIsLoading(true);
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/analytics/performance/summary/`;
                if (start && end) {
                    url += `?start_date=${start}&end_date=${end}`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${session?.user?.access}`,
                    },
                });

                const data = response.data;
                // Basic shape check
                if (!data?.today || !data?.yesterday) {
                    toast.error('No data found for selected range');
                    setSalesData({
                        today: { profit: 0, total_revenue: 0, items_sold: 0 },
                        yesterday: { profit: 0, total_revenue: 0, items_sold: 0 },
                    });
                    return;
                }
                setSalesData(data);
            } catch (error) {
                toast.error('Failed to load performance data');
            } finally {
                setIsLoading(false);
            }
        };
        useEffect(() => {
            if (session?.user?.access) {
                fetchSales();
            }
        }, [session]);


        const handleFilter = () => {
            if (!startDate || !endDate) {
                toast.error('Please select both start and end dates');
                return;
            }

            fetchSales(startDate, endDate);
        };


    ChartJS.register(
        CategoryScale,
        LinearScale,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend
    );
    const data = {
        labels: ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'],
        datasets: [
            {
                label: 'Total Sales',
                data: [2000, 40000, 9000, 23000, 1200, 6570, 23400, 9000],
                borderColor: '#7E5CAD',
                backgroundColor: 'transparent',
                tension: 0.3,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5000,
                    callback: (value) => `KES ${value / 1000}K`,
                },
            },
        },
    };
    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full bg-[#F8FAFC] ">
                    <div>
                        <h1 className="font-bold text-lg text-gray-600 pt-4">Performance Overview</h1>
                        <p className="text-xs text-gray-500 italic">View your business performance metrics</p>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-4 mb-4 pb-4 pt-4">
                        {/* allow user to select start and end date to filter summary */}
                        <div className="flex flex-col lg:flex-row justify-between items-center mt-4">
                            <div className="flex flex-row items-center gap-2">
                                <label className="text-sm text-gray-600">Select Date Range:</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border rounded-md p-2"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border rounded-md p-2"
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4 mt-4 lg:mt-0">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Total Revenue Today</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{salesData?.today?.total_revenue ?? 0}</h2>
                                {salesData?.today?.total_revenue > salesData?.yesterday?.total_revenue ? (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                        {/* {((salesData.today.total_revenue - salesData.yesterday.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                        {/* {((salesData.yesterday.total_revenue - salesData.today.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* profits */}
                        <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Profit Today</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{salesData?.today?.profit ?? 0}</h2>

                                {/*show arrow up or down on revenue change */}
                                {salesData?.today?.profit  > salesData?.yesterday?.profit ? (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                        {/* {((salesData.today.total_revenue - salesData.yesterday.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                        {/* {((salesData.yesterday.total_revenue - salesData.today.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                )}
                                {/* <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p> */}
                            </div>
                        </div>
                        <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Total Products Sold Today</p>
                                <h2 className="text-xl text-gray-800 font-bold">{salesData?.today?.items_sold ?? 0}</h2>
                                {salesData?.today?.items_sold > salesData?.yesterday?.items_sold ? (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                        {/* {((salesData.today.total_revenue - salesData.yesterday.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                        {/* {((salesData.yesterday.total_revenue - salesData.today.total_revenue) / salesData.yesterday.total_revenue * 100).toFixed(2)}% */}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] lg:w-full bg-white border">
                        <div className="p-4 ">
                            <p className="text-sm text-gray-600 font-semibold">Sales Over Time</p>
                            <Line data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Perfomance;
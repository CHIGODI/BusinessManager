'use client';
import axios from "axios";
import { toast } from "react-toastify";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format, parseISO } from 'date-fns';
import NavBar from "@/app/sharedComponents/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
    BarChart, Bar, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, LineChart,
    ComposedChart
} from 'recharts';



const Perfomance = () => {
        const [isLoading, setIsLoading] = useState(true);
        const [startDate, setStartDate] = useState('');
        const [isFiltered, setIsFiltered] = useState(false);
        const [endDate, setEndDate] = useState('');
        const [ filter, setFilter ] = useState('Filter')
        const { data: session } = useSession();
        const [ daily_sales, setDailySales ] = useState([]);
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
        const formatDateLabel = (dateString) => {
            const date = parseISO(dateString);
            const totalDays = daily_sales.length;

            // Over a month of data? Show month/year
            if (totalDays > 31) return format(date, 'MMM yyyy');
            if (totalDays > 60) return format(date, 'MMM');

            // Otherwise show day + short month
            return format(date, 'dd MMM');
        };
        console.log(daily_sales);

        const fetchSales = async (start = '', end = '') => {
            setIsLoading(true);
            try {
                setFilter('Filtering')
                let url = `${process.env.NEXT_PUBLIC_API_URL}/analytics/performance/summary/`;
                const filtering = start && end;
                if (filtering) {
                    url += `?start_date=${start}&end_date=${end}`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${session?.user?.access}`,
                    },
                });

                const data = response.data;
                if (!data?.period) {
                    toast.error('No data found for selected range');
                    return;
                }
                setFilter('Filter')
                setSalesData(data);
                console.log(data.period);
                setDailySales(data?.period.daily_sales || []);
                setIsFiltered(filtering);
            } catch (error) {
                setFilter('Filter')
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

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full bg-[#F8FAFC] overflow-y-auto">
                    <div>
                        <h1 className="font-bold text-lg text-gray-600 pt-4">Performance Overview</h1>
                        <p className="text-xs text-gray-500">View your business performance metrics</p>
                    </div>
                    <div className="flex flex-row lg:flex-row justify-between items-center mt-4 mb-4 pb-4 pt-4">
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
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleFilter}>{filter}</button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <button className="p-2 bg-orange-500 text-white text-sm hover:bg-orange-600">Export to Excell</button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 lg:gap-2 ">
                        <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Total Revenue</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{(salesData?.period?.total_revenue ?? 0).toFixed(2)}</h2>
                                {!isFiltered && salesData?.period?.total_revenue > salesData?.yesterday?.total_revenue && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                    </span>
                                )}
                                {!isFiltered && salesData?.period?.total_revenue <= salesData?.yesterday?.total_revenue && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* profits */}
                        <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Profit</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{(salesData?.period?.profit ?? 0).toFixed(2)}</h2>
                                {/*show arrow up or down on revenue change */}
                                {!isFiltered && salesData?.period?.total_revenue > salesData?.yesterday?.total_revenue && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                    </span>
                                )}
                                {!isFiltered && salesData?.period?.total_revenue <= salesData?.yesterday?.total_revenue && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400">Items sold</p>
                                <h2 className="text-xl text-gray-800 font-bold">{salesData?.period?.items_sold ?? 0}</h2>
                                {!isFiltered && salesData?.period?.total_revenue > salesData?.yesterday?.total_revenue && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                    </span>
                                )}
                                {!isFiltered && salesData?.period?.total_revenue <= salesData?.yesterday?.total_revenue && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400 text-green-400">Mpesa Sales</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{(salesData?.period?.mpesa_sales ?? 0).toFixed(2)}</h2>
                                {!isFiltered && salesData?.period?.mpesa_sales > salesData?.yesterday?.mpesa_sales && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                    </span>
                                )}
                                {!isFiltered && salesData?.period?.mpesa_sales <= salesData?.yesterday?.mpesa_sales && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                            <div className="p-4">
                                <p className="pb-2 text-sm text-gray-400 text-yellow-400">Cash Sales</p>
                                <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>{(salesData?.period?.cash_sales ?? 0).toFixed(2)}</h2>
                                {!isFiltered && salesData?.period?.cash_sales > salesData?.yesterday?.cash_sales && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                    </span>
                                )}
                                {!isFiltered && salesData?.period?.cash_sales <= salesData?.yesterday?.cash_sales && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                        <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-[600px] h-[250px] mx-auto mt-12 mb-12">
                        {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-full max-w-[600px] h-[250px] bg-gray-50 rounded-lg animate-pulse relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gray-200 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-[15%] w-[6%] h-2/5 bg-gray-300 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-[30%] w-[6%] h-1/2 bg-gray-300 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-[45%] w-[6%] h-[70%] bg-gray-300 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-[60%] w-[6%] h-[30%] bg-gray-300 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-[75%] w-[6%] h-[60%] bg-gray-300 animate-pulse"></div>
                                </div>
                            </div>
                        ) : daily_sales.length === 0 ? (
                            <p className="text-gray-500 text-center mt-10">No sales data to display</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={daily_sales}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tickFormatter={formatDateLabel} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="Revenue (KES)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Perfomance;
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
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../../components/SideNav";

const KeyMetrics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterLabel, setFilterLabel] = useState('Filter');
    const [isFiltered, setIsFiltered] = useState(false);
    const [dailySales, setDailySales] = useState([]);
    const [salesData, setSalesData] = useState({ today: {}, yesterday: {} });
    const { data: session } = useSession();

    const formatDateLabel = (dateString) => {
        const date = parseISO(dateString);
        const totalDays = dailySales.length;
        if (totalDays > 60) return format(date, 'MMM');
        if (totalDays > 31) return format(date, 'MMM yyyy');
        return format(date, 'dd MMM');
    };
    const formatKES = (num) =>
        Number(num).toLocaleString('en-KE', { minimumFractionDigits: 2 });

    const fetchSales = async (start = '', end = '') => {
        setIsLoading(true);
        try {
            setFilterLabel('Filtering');
            let url = `${process.env.NEXT_PUBLIC_API_URL}/analytics/performance/summary/`;
            const filtering = start && end;
            if (filtering) url += `?start_date=${start}&end_date=${end}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${session?.user?.access}` },
            });

            const data = response.data;
            if (!data?.period) return toast.error('No data found for selected range');

            setSalesData(data);
            setDailySales(data.period.daily_sales || []);
            setIsFiltered(filtering);
        } catch (err) {
            toast.error('Failed to load performance data');
        } finally {
            setFilterLabel('Filter');
            setIsLoading(false);
        }
    };

    const handleFilter = () => {
        if (!startDate || !endDate) return toast.error('Please select both start and end dates');
        fetchSales(startDate, endDate);
    };

    useEffect(() => {
        if (session?.user?.access) fetchSales();
    }, [session]);

    const StatCard = ({ label, value, compare }) => {
        const current = parseFloat(value);
        const isSame = current === compare;
        const isUp = current > compare;

        let percent = 0;
        if (compare === 0) {
            percent = current === 0 ? 0 : 100;
        } else {
            percent = ((current - compare) / compare) * 100;
        }
        if (label == 'Item Sold') {
            console.log(compare)
        }
        const formattedPercent = `${isUp ? '+' : ''}${percent.toFixed(1)}%`;

        return (
            <div className="flex-1 min-w-[250px] max-w-[300px] bg-white shadow-sm rounded-xl">
                <div className="p-4">
                    <p className="pb-2 text-sm text-gray-400">{label}</p>
                    {/* if value is item sold dont add kes before it */}
                    <h2 className="text-xl text-gray-800 font-bold">
                        {label === 'Items Sold'
                            ? Number(value).toLocaleString('en-KE')
                            : (<><span className="text-gray-500 text-sm">KES</span> {formatKES(value)}</>)
                        }
                    </h2>

                    {!isFiltered && !isSame && (
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-xl ${isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            <FontAwesomeIcon className="pr-1" icon={isUp ? faArrowTrendUp : faArrowTrendDown} />
                            {formattedPercent}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    const period = salesData?.period || {};
    const yesterday = salesData?.yesterday || {};
    return (
        <div className="">
            <div className="flex flex-col lg:flex-row justify-between items-center mt-4 mb-4 pb-4 pt-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Select Date Range:</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded-md p-2" />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded-md p-2" />
                    <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">{filterLabel}</button>
                </div>
                <button className="p-2 bg-orange-500 text-white text-sm hover:bg-orange-600">Export to Excel</button>
            </div>

            <div className="flex flex-wrap gap-4 lg:gap-2">
                <StatCard label="Total Revenue" value={`${(period.total_revenue || 0).toFixed(2)}`} compare={yesterday.total_revenue || 0} />
                <StatCard label="Profit" value={`${(period.profit || 0).toFixed(2)}`} compare={yesterday.profit || 0} />
                <StatCard label="Items Sold" value={period.items_sold || 0} compare={yesterday.number_of_sales || 0} />
                <StatCard label="Mpesa Sales" value={`${(period.mpesa_sales || 0).toFixed(2)}`} compare={yesterday.mpesa_sales || 0} />
                <StatCard label="Cash Sales" value={`${(period.cash_sales || 0).toFixed(2)}`} compare={yesterday.cash_sales || 0} />
            </div>

            <div className="h-[250px]  mt-12 mb-12">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center animate-pulse bg-[#F8FAFC] "></div>
                ) : dailySales.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">No sales data to display</p>
                ) : (
                    <div className="bg-white">
                        <p className="text-center font-bold text-sm text-gray-500 mb-2 w-full">Sales Trend</p>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailySales}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tickFormatter={formatDateLabel} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="purple"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="Revenue (KES)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default KeyMetrics;
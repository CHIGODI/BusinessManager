"use client";
import NavBar from "@/app/sharedComponents/NavBar";
import SideNav from "../../components/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

const Summary = () => {
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
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full bg-[#F8FAFC] flex flex-col
                                items-center lg:items-start lg:flex-row lg:flex-wrap gap-4
                                overflow-y-scroll scrollbar-hidden">
                    {/* Total summary */}
                    <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4 mt-4 lg:mt-0">
                        <div className="p-4">
                            <p className="pb-2 text-sm text-gray-400">Total Today</p>
                            <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>22,0000</h2>
                            {/* <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p> */}
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p>

                        </div>
                    </div>

                    {/* profits */}
                    <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4">
                        <div className="p-4">
                            <p className="pb-2 text-sm text-gray-400">Profit Today</p>
                            <h2 className="text-xl text-gray-800 font-bold"><span className="text-gray-600 text-sm mr-1">KES</span>22,0000</h2>
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p>
                            {/* <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p> */}

                        </div>
                    </div>
                    <div className="border bg-white shadow-sm rounded-xl h-[20%] lg:h-1/4 w-[90%] lg:w-1/4">
                        <div className="p-4">
                            <p className="pb-2 text-sm text-gray-400">Total Products Sold Today</p>
                            <h2 className="text-xl text-gray-800 font-bold">100</h2>
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowUp} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p>
                            {/* <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-xl gap-2">
                                <FontAwesomeIcon className="pr-2" icon={faArrowDown} />
                                2.5%
                            </span>
                            <p className="text-xs text-gray-400 inline-block pl-2">Compared to yesterday</p> */}

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
    )
};
export default Summary;
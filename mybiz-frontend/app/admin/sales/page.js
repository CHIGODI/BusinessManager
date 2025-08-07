'use client';
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { useSession } from "next-auth/react";
import NavBar from "../../sharedComponents/NavBar";


const AllSales = () => {

    const [isLoading, setIsLoading ] = useState(true);
    const [error, setError] = useState(null);
    const [sales, setSales] = useState([]);
    const { data: session } = useSession();
    const [openSaleId, setOpenSaleId] = useState(null);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const [allSales, totalSales] = await Promise.all([
                    axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/sales/`,
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
                setSales(allSales.data);
                if (totalSales.data.total_sales_for_period.total_sales) {
                    setTotalSales(totalSales.data.total_sales_for_period.total_sales.toLocaleString());
                }
                else {
                    setTotalSales(0.0);
                }
                setIsLoading(false);
            } catch (error) {
                toast.error('No sales found, or refresh the page');
                setIsLoading(false);
            }
        };

        if (session) {
            fetchSales();
        }
    }, [session]);

    const handleViewDetails = (saleId) => {
        setOpenSaleId(openSaleId === saleId ? null : saleId);
    };


    if (isLoading) {
        return (
            <div className="h-screen">
                <NavBar />
                <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                    <SideNav />
                    <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg text-gray-600 pt-4 pl-4">All Sales</h2>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 font-bold ">Today's Total: <span className="bg-gray-200 m-2"></span></p>
                            </div>
                        </div>
                        <div className="h-full border overflow-y-scroll scrollbar-hidden bg-white">
                            <div className="p-4">
                                <div className="">
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10 text-skeleton"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-600 p-2 lg:pt-4 pl-4">All Sales</h2>
                        <div className="p-4">
                            <p className="text-sm text-gray-600 font-bold ">Today&apos;s Total: {totalSales}</p>
                        </div>
                    </div>
                    <div className="border h-full shadow-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-300 bg-white">
                        {sales.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {sales.map((sale) => (
                                    <div key={sale.sale_id} className="p-4 flex flex-col justify-between items-center space-y-4">
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <div className="text-sm text-gray-600 w-1/2">
                                                <p className="text-sm text-gray-600">Total Amount: KES {sale.total_amount.toFixed(2)} </p>
                                                <p>Discount: KES {sale.discounted_total}</p>
                                            </div>
                                            <button
                                                className="text-purple-600 hover:text-purple-800 text-sm"
                                                onClick={() => handleViewDetails(sale.sale_id)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        {openSaleId === sale.sale_id && (
                                            <ol className="list-decimal list-inside w-full flex flex-col space-y-4 bg-[#F8FAFC] p-4">
                                                <p className="text-sm text-gray-400">Products</p>
                                                {sale.products.map((product, index) => (
                                                    <li key={index} className="text-xs text-gray-500">
                                                        {product.name} {product.size} | Qty: {product.quantity} | Price: KES {product.price}
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="p-4 text-center text-gray-600">No sales found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSales;
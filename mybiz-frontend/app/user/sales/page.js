'use client';
'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import SideNav from "../../sharedComponents/SideNav";
import NavBar from "../../sharedComponents/NavBar";
import { toast } from "react-toastify";

const AllSales = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sales, setSales] = useState([]);
    const { data: session } = useSession();
    const [openSaleId, setOpenSaleId] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(
                    'http://104.248.235.64/api/v1/sales/',
                    {
                        headers: {
                            "Authorization": `Bearer ${session?.user?.access}`,
                        }
                    }
                );
                setSales(response.data);
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
                                <p className="text-sm text-gray-600 font-bold ">Today's Total: 12,000</p>
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
                            <p className="text-sm text-gray-600 font-bold ">Today&apos;s Total: 12,000</p>
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
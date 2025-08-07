'use client'
import NavBar from "../../sharedComponents/NavBar";
import SideNav from "../../sharedComponents/SideNav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";


const AllProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/products/`,
                    {
                        headers: {
                            "Authorization": `Bearer ${session?.user?.access}`,
                        }
                    }
                );
                if (response.status === 200) {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                toast.error('Error loading products');
                setIsLoading(false);
            }
        };

        if (session) {
            fetchProducts();
        }
    }, [session]);

    if (isLoading) {
        return (
            <div className="h-screen">
                <NavBar />
                <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                    <SideNav />
                    <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%] h-full flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg text-gray-600 pt-4 pl-4">All Products</h2>
                        </div>
                        <div className="h-full border overflow-y-scroll scrollbar-hidden bg-white">
                            <div className="p-4">
                                <div className=" bg-white">
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-[100%] lg:w-[80%] md:px-[2%] md:py-[2%]
                                    h-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-600 pt-4 pl-4">All Products</h2>
                    </div>
                    <div className="h-full border overflow-y-scroll scrollbar-hidden bg-white">
                        {products.length === 0 ? (
                            <p className="p-4 text-center text-gray-600 flex items-center justify-center h-full text-sm">No products found! Try refreshing page</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] text-gray-400 pb-1">last edited: {new Date(product.updated_at).toLocaleDateString()}</p>
                                            <p className="font-medium text-sm text-gray-600">{product.name} {product.size}</p>
                                            <p className="text-xs text-gray-400">
                                                Price: KES {product.unit_selling_price} | Quantity: {product.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllProducts;
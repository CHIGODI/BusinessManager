'use client'
import NavBar from "../../sharedComponents/NavBar";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductButton from "./components/EditProductButton";
import AddProductButton from "./components/AddProductsButtonAndForm";


const AllProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { data: session } = useSession();
    const [openProductId, setOpenProductId] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/v1/products/',
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
                toast.error('No products found, or refresh the page');
                setIsLoading(false);
            }
        };

        if (session) {
            fetchProducts();
        }
    }, [session]);

    const handleViewDetails = (productID) => {
        setOpenProductId(openProductId === productID ? null : productID);
    };

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
                                    <div className=" bg-gray-200 rounded w-full mb-4 h-8 text-skeleton"></div>
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
                    <div className="flex justify-between items-center p-4">
                        <h2 className="font-bold text-lg text-gray-600">All Products</h2>
                        <AddProductButton />
                    </div>
                    <div className="h-full border overflow-y-scroll scrollbar-hidden bg-white">
                        {products.length === 0 ? (
                            <p className="p-4 text-center text-gray-600 flex items-center justify-center h-full text-sm">No products found! Try refreshing page</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="p-4 ">
                                        <div className="flex flex-column space-x-4 justify-between pb-4">
                                            <div>
                                                <p className="font-medium text-gray-600">{product.name} {product.size}</p>
                                                <p className="text-sm text-gray-400">
                                                    Price: KES {product.unit_selling_price} | Quantity: {product.quantity}
                                                </p>
                                            </div>
                                            <button
                                                className="text-purple-600 hover:text-purple-800 text-sm"
                                                onClick={() => handleViewDetails(product.id)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        {openProductId === product.id && (
                                            <ul className="bg-[#F8FAFC] p-4 space-y-4 flex flex-row">
                                                <div className="w-1/2 h-full">
                                                    <li className="text-xs text-gray-400">
                                                        Manufacturer: {product.manufacturer}
                                                    </li>
                                                    <li className="text-xs text-gray-400">
                                                        Category: {product.category}
                                                    </li>
                                                    <li className="text-xs text-gray-400">
                                                        Description: {product.description}
                                                    </li>
                                                </div>
                                                <div className="w-1/2 h-full flex justify-end">
                                                   <EditProductButton product={product} />
                                                   <button className="text-red-600 hover:text-red-800 text-sm px-4 py-2">
                                                        Delete
                                                    </button>
                                                </div>
                                            </ul>
                                        )}
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
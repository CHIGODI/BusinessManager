'use client'
import NavBar from "../../sharedComponents/NavBar";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductButton from "./components/EditProductButton";
import AddProductButton from "./components/AddProductsButtonAndForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const AllProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { data: session } = useSession();
    const [openProductId, setOpenProductId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const filteredProducts = searchQuery.trim()
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

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
                toast.error('No products found, or refresh the page');
                setIsLoading(false);
            }
        };

        if (session) {
            fetchProducts();
        }
    }, [session, shouldRefresh]);

    const handleViewDetails = (productID) => {
        setOpenProductId(openProductId === productID ? null : productID);
    };

    const deleteProduct = async (productId) => {
        console.log(session?.user?.access)
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/`,
                {
                    headers: {
                        "Authorization": `Bearer ${session?.user?.access}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success("Product deleted successfully")
                setIsLoading(false);
            }
        } catch (error) {
            toast.error('Cant delete, please try later');
            setIsLoading(false);
        }
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
                        <div className="relative w-[40%] max-w-md mx-auto">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="text-xs w-full pl-10 pr-4 py-1 border-b border-gray-300 focus:outline-none focus:border-gray-600"
                            />
                            <FontAwesomeIcon
                                className="text-xs w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                                icon={faMagnifyingGlass}
                            />
                        </div>
                        <AddProductButton triggerRefresh={() => setShouldRefresh(prev => !prev)}  />
                    </div>
                    <div className="h-full border overflow-y-scroll scrollbar-hidden bg-white">
                        {filteredProducts.length === 0 ? (
                            <p className="p-4 text-center text-gray-600 flex items-center justify-center h-full text-sm">No products found! Try refreshing page</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <li key={product.id} className="p-4 ">
                                        <div className="flex flex-column space-x-4 justify-between pb-4">
                                            <div>
                                                <p className="text-[10px] text-gray-400 pb-1">last edited: {new Date(product.updated_at).toLocaleDateString()}</p>
                                                <p className="font-medium text-sm text-gray-600">{product.name} {product.size}</p>
                                                <p className="text-xs text-gray-400">
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
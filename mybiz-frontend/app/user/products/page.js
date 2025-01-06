'use client'
import NavBar from "../../sharedComponents/NavBar";
import SideNav from "../../sharedComponents/SideNav";
import AddProductsButtonAndForm from "./components/AddProductsButtonAndForm";
import { useState } from "react";
import { useSession } from "next-auth/react";

const allProducts = () => {
    // const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    const products = [
        { id: 1, name: "Product 1", unit_selling_price: 10.5, quantity: 50 },
        { id: 2, name: "Product 2", unit_selling_price: 15.75, quantity: 30 },
        { id: 3, name: "Product 3", unit_selling_price: 8.99, quantity: 20 },
        { id: 4, name: "Product 4", unit_selling_price: 12.49, quantity: 40 },
        { id: 5, name: "Product 5", unit_selling_price: 5.99, quantity: 10 },
        { id: 6, name: "Product 6", unit_selling_price: 9.99, quantity: 25 },
        { id: 7, name: "Product 7", unit_selling_price: 18.25, quantity: 15 },
        { id: 8, name: "Product 8", unit_selling_price: 7.49, quantity: 5 },
        { id: 9, name: "Product 9", unit_selling_price: 6.75, quantity: 35 },
        { id: 10, name: "Product 10", unit_selling_price: 22.5, quantity: 12 },
        { id: 11, name: "Product 11", unit_selling_price: 11.99, quantity: 45 },
        { id: 12, name: "Product 12", unit_selling_price: 14.5, quantity: 30 },
        { id: 13, name: "Product 13", unit_selling_price: 19.99, quantity: 20 },
        { id: 14, name: "Product 14", unit_selling_price: 8.25, quantity: 8 },
    ]
    const handleAddProduct = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/products/',
                product,
                {
                    headers: {
                        "Authorization": `Bearer ${session?.user?.access}`,
                    }
                }
            );
            if (response.status === 200) {

            }
        } catch (error) {

        }
    };

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-full">
                <SideNav />
                <div className="w-[80%] px-[2%] py-[2%]
                                    h-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-600">All Products</h2>
                    </div>
                    <div className="rounded-xl border h-full
                                        shadow-sm overflow-y-scroll scrollbar-thin
                                        scrollbar-thumb-rounded-full
                                        scrollbar-track-rounded
                                        scrollbar-thumb-gray-500
                                        scrollbar-track-gray-300
                                        bg-white"
                    >
                        {products.length > 0 && (
                            <ul className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.id} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Price: KES {product.unit_selling_price.toFixed(2)} | Quantity: {product.quantity}
                                            </p>
                                        </div>
                                        <button
                                            className="text-purple-600 hover:text-purple-800 text-sm"
                                            onClick={() => console.log(`Viewing details for ${product.name}`)}
                                        >
                                            View Details
                                        </button>
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
export default allProducts;
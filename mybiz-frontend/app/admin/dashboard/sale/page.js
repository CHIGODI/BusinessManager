'use client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import CartCard from './components/CartCard';
import { useSession } from 'next-auth/react';
import SideNav from '../../components/SideNav';
import CheckoutCard from './components/CheckoutCard';
import NavBar from '../../../sharedComponents/NavBar';
import ProductListCard from './components/ProductListCard';


export default function SalePage() {
    const [viewTotal, setViewTotal] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // const [quantity, setQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { data: session, status } = useSession()
    const isLoading = status === "loading";

    useEffect(() => {
        if (isLoading) return;

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/products/',
                    {
                        headers: {
                            "Authorization": `Bearer ${session?.user?.access}`,
                        }
                    }
                );
                if (response.status === 200) {
                    setProducts(response.data);
                    setFilteredProducts(response.data);
                }
            } catch (error) {
                toast.error('No products found, or refresh the page');
            }
        };

        fetchProducts();
    }, [isLoading, session, cart]);

    // when adding product to cart, always set a quantity
    const addProductToCart = (product) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(p => p.id === product.id);

            if (existingIndex !== -1) {
                // Already in cart → increase quantity by 1
                const updated = [...prevCart];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: (updated[existingIndex].quantity || 1) + 1,
                };
                return updated;
            }

            // New product → start with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };


    // update quantity
    const setQuantity = (index, newQty) => {
        setCart((prevCart) => {
            const updated = [...prevCart];

            // Allow empty string while typing
            if (newQty === "" || isNaN(newQty)) {
                updated[index] = { ...updated[index], quantity: "" };
            } else {
                updated[index] = { ...updated[index], quantity: newQty > 0 ? newQty : 1 };
            }

            return updated;
        });
    };

    const removeProductFromCart = (productIndex) => {
        setCart((prevCart) => prevCart.filter(
            (_, index) => index !== productIndex)
        );
    };

    const handleSearch = (event) => {
        const search = event.target.value;
        setSearchTerm(search);
        if (search.trim() === '') {
            setFilteredProducts(filteredProducts);
            return;
        }
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const totalSalePayable = () => {
        return cart.reduce((acc, product) => {
            const qty = Number(product.quantity) || 0;
            const price = Number(product.unit_selling_price) || 0;
            return acc + qty * price;
        }, 0);
    };

    return (
        <div className="h-screen">
            <NavBar />
            <div className="relative flex flex-row w-full h-[calc(100vh-70px)]">
                <SideNav />
                <div className="w-full lg:w-[80%] md:px-[2%] md:py-[2%]
                                h-full flex flex-row md:gap-4 bg-[#F8FAFC]">
                    {/* all products card */}
                    <ProductListCard
                        products={filteredProducts}
                        addProductToCart={addProductToCart}
                    />
                    {/* cart and checkout card */}
                    <div className='w-1/2 flex flex-row md:flex-col md:gap-4 h-full'>
                        <CartCard
                            products={cart}
                            removeProductFromCart={removeProductFromCart}
                            setQuantity={setQuantity}
                        />
                        <CheckoutCard
                            total={totalSalePayable()}
                            products={cart}
                            session={session}
                            setCart={setCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
'use client';
import { useState } from 'react';
import NavBar from '../../../sharedComponents/NavBar';
import SideNav from '../../../sharedComponents/SideNav';
import CheckoutCard from './components/CheckoutCard';
import ProductListCard from './components/ProductListCard';
import CartCard from './components/CartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function SalePage() {
    const [viewTotal, setViewTotal] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { data: session, status} = useSession()
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
    }, [isLoading, session]);


    // add product to cart
    const addProductToCart = (product) => {
        setCart((prevCart) => [...prevCart, product])
    };

    // remove product from cart
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
        const total = cart.reduce((accumulator, product) => {
            return accumulator + Number(product.unit_selling_price);
        }, 0);
        return total;
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
                    <div className='w-1/2 flex flex-row md:flex-col gap-4 h-full'>
                        <CartCard
                            products={cart}
                            removeProductFromCart={removeProductFromCart}
                        />
                        <CheckoutCard total={totalSalePayable()}
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
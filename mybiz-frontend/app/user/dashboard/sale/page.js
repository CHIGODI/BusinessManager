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
            <div className="relative flex flex-row w-full h-full">
                <SideNav />
                <div className="flex flex-col w-full lg:w-[80%] px-[2%] py-[2%]
                                h-full md:grid md:grid-cols-2
                                lg:gap-x-4 bg-[#F8FAFC]">
                    {/* search products and days total  */}
                    <div className="col-span-2 flex items-center h-3/5">
                        <div className='
                        w-full
                                        lg:w-1/2 flex
                                        items-center
                                        h-full'>
                            <input
                                type="text"
                                placeholder="Search product..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="text-sm w-[80%]
                                            p-4 border border-gray-300
                                            rounded-tl-full rounded-bl-full
                                            mt-4 mb-4 outline-none
                                            focus:border-purple-500
                                            "/>
                            <button className='text-sm
                                               text-white
                                               border-t border-b
                                               border-r p-4 rounded-tr-full
                                               rounded-br-full
                                               hover:bg-opacity-90
                                                w-[20%]
                                               bg-purple-600'>
                                Search
                            </button>
                        </div>
                        <div className='hidden
                                        ml-auto p-4 w-2/6
                                        border rounded-xl shadow-sm
                                        lg:flex flex-row justify-center
                                        items-center text-[#001F3F]
                                        bg-white
                                        h-full'>
                            <FontAwesomeIcon icon={faEye} aria-hidden="true"
                                className={`text-sm ${viewTotal ? 'block' : 'invisible'}
                                            cursor-pointer
                                            p-2 rounded-lg
                                            hover:bg-gray-200
                                            text-gray-600
                                        `}
                                onClick={() => setViewTotal(!viewTotal)}
                            />
                            <FontAwesomeIcon icon={faEyeSlash} aria-hidden="true"
                                className={`text-sm ${viewTotal ? 'invisible' : 'block'}
                                            cursor-pointer
                                            p-2 rounded-lg
                                            hover:bg-gray-200
                                            text-gray-600
                                        `}
                                onClick={() => setViewTotal(!viewTotal)}
                            />
                            <h2 className={`${viewTotal ? '' : 'filter blur-sm'}
                                            text-purple-600 font-bold`}>
                                Today's Total: 10,000
                            </h2>
                        </div>
                    </div>
                    {/* all products card */}
                    <ProductListCard
                        products={filteredProducts}
                        addProductToCart={addProductToCart}
                    />
                    {/* cart and checkout card */}
                    <div className='flex flex-row md:flex-col gap-4 h-[29rem]'>
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
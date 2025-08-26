import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';

const ProductListCard = ({products, addProductToCart}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = searchQuery.trim()
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;
    return(
        <div className="w-1/2 border h-3/4 md:h-full
                                    overflow-y-scroll scrollbar-hide
                                    md:bg-white"
        >
            {/* <Link href='/products' className='hover:underline hover:text-[#01F3F]'> */}
                <div className='top-0 z-10 p-4 text-gray-600 bg-white flex justify-between items-center'>
                    <label className='font-bold '>PRODUCTS </label>
                    <div className="relative w-[40%] max-w-md mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="bg-gray-100 text-xs w-full pl-10 pr-4 py-1 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400"
                        />
                        <FontAwesomeIcon
                            className="text-xs w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                            icon={faMagnifyingGlass}
                        />
                    </div>
                    <FontAwesomeIcon aria-hidden='true' className='text-sm text-gray-600' icon={faBagShopping} />
                </div>
            {/* </Link> */}
            {/* conditionally render list of products */}
            {filteredProducts.length > 0 ? (
                <table className='w-full'>
                    <thead className="sticky top-0 bg-gray-100 z-5">
                        <tr>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">S.P</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 h-[2%]" onClick={() => { addProductToCart(product) }}>
                                    <td className=" md:table-cell border-b px-4 py-2 text-sm text-[#4A4A4A] flex flex-col text-wrap">{product.name} {product.size}
                                        <span className="text-xs text-gray-400 space-x-1 md:hidden">S.P | {product.unit_selling_price}</span>
                                        <span className="text-xs text-gray-400 space-x-1 md:hidden">Qty | {product.quantity}</span>
                                    </td>
                                    <td className="hidden md:table-cell border-b px-4 py-2 text-sm text-[#4A4A4A] text-wrap">{product.quantity}</td>
                                    <td className="hidden md:table-cell border-b px-4 py-2 text-sm text-[#4A4A4A] text-wrap">{product.unit_selling_price}</td>
                                    <td className="hidden md:table-cell border-b px-4 py-2 text-sm text-[#4A4A4A] text-wrap">{product.manufacturer}</td>
                                </tr>
                            ))}

                    </tbody>
                </table>) : (
                    <div className="flex flex-col justify-center items-center h-3/4 md:h-full p-4 bg-[#F8FAFC]">
                    <p className="text-gray-400 text-sm text-center">No products in store</p>
                    <p className="text-gray-400 text-sm text-center">Add products to store to make a sale</p>
                </div>
            )}
        </div>
    );
};
export default ProductListCard;
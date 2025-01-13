import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const ProductListCard = ({products, addProductToCart}) => {
    return(
        <div className="w-1/2 border h-3/4 md:h-full
                                    overflow-y-scroll scrollbar-hide
                                    md:bg-white"
        >
            <Link href='/products' className='hover:underline hover:text-[#01F3F]'>
                <div className='top-0 z-10 p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                    PRODUCTS
                    <FontAwesomeIcon aria-hidden='true' className='text-sm text-gray-600' icon={faBagShopping} />
                </div>
            </Link>
            {/* conditionally render list of products */}
            {products.length > 0 ? (
                <table className='w-full'>
                    <thead className="sticky top-0 bg-gray-100 z-5">
                        <tr>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Selling Pr</th>
                            <th className="hidden md:table-cell border-b px-4 py-2 text-left text-sm text-gray-600">Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 h-[2%]" onClick={() => { addProductToCart(product); console.log(product); }}>
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
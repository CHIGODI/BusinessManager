import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const ProductListCard = ({products, addProductToCart}) => {
    return(
        <div className="md:rounded-xl md:border h-screen md:h-[29rem]
                                    md:shadow-sm md:overflow-y-scroll scrollbar-thin
                                    md:scrollbar-thumb-rounded-full
                                    scrollbar-track-rounded
                                    scrollbar-thumb-gray-500
                                    scrollbar-track-gray-300
                                    md:bg-white"
        >
            <Link href='/products' className='hover:underline hover:text-[#01F3F]'>
                <h2 className='top-0 z-10 p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                    ALL PRODUCTS
                    <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faBagShopping} />
                </h2>
            </Link>
            {/* conditionally render list of products */}
            {products.length > 0 ? (
                <table className='w-full'>
                    <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Selling Price</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 h-[2%]" onClick={() => { addProductToCart(product); console.log(product); }}>
                                    <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.name}</td>
                                    <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.quantity}</td>
                                    <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.unit_selling_price}</td>
                                    <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.manufacturer}</td>
                                </tr>
                            ))}

                    </tbody>
                </table>) : (
                    <div className="flex flex-col justify-center items-center h-full bg-[#F8FAFC]">
                    <p className="text-gray-400 text-sm">No products in store</p>
                    <p className="text-gray-400 text-sm">Add products to store to make a sale</p>
                </div>
            )}
        </div>
    );
};
export default ProductListCard;
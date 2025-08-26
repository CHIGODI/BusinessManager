import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';


const CartCard = ({ products, removeProductFromCart, setQuantity }) => {
    console.log(products)

    return (
        <div className='h-3/4 md:h-1/2 w-full border overflow-y-scroll scrollbar-hide'>
            <div className='relative p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                <h2>CART</h2>
                <FontAwesomeIcon aria-hidden='true' className='text-sm text-gray-600 pr-1' icon={faCartShopping} />
            </div>
            {/* conditionally render list of producst if added to cart */}
            {products.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-gray-100 z-5">
                        <tr>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className='rounded-full hover:bg-gray-50'>
                                <td className=" border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.name}</td>
                                <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">
                                    <input
                                        type="number"
                                        min="1"
                                        value={product.quantity === "" ? "" : product.quantity}
                                        onChange={(e) => setQuantity(index, e.target.value === "" ? "" : Number(e.target.value))}
                                        className="w-16 border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-gray-300"
                                    />
                                </td>

                                {/* <td className=" border-b px-4 py-2 text-sm text-[#4A4A4A]">{product.quantity}</td> */}
                                <td className=" border-b px-4 py-2 text-sm text-[#4A4A4A]">
                                    <FontAwesomeIcon className='text-xs text-gray-500 rounded-full hover:text-red-500 transition-colors duration-1000'
                                        icon={faTrashCan} onClick={() => removeProductFromCart(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col justify-center items-center h-3/4 md:h-1/2 p-4">
                    <p className="text-gray-400 text-sm text-center">No products in cart</p>
                    <p className="text-gray-400 text-sm text-center">Add products to cart to make a sale</p>
                </div>
            )}
        </div>
    );
};
export default CartCard;
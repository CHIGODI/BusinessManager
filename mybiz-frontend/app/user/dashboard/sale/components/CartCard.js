import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';


const CartCard = ({products, removeProductFromCart}) => {

    return(
        <div className='h-1/2 border rounded-xl shadow-sm overflow-y-scroll scrollbar-thin '>
            <div className=' relative p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                <h2>CART</h2>
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600 pr-1' icon={faCartShopping} />
                {products.length > 0 && (
                    <span
                        className="bg-gray-600 text-white text-xs absolute top-5 right-3 transform translate-x-2 -translate-y-2 rounded-full px-2 py-1"
                    >
                        {products.length}
                    </span>
                )}

            </div>
            {/* conditionally render list of producst if added to cart */}
            {products.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-gray-100 z-10">
                        <tr>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                            <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className='rounded-full hover:bg-gray-50'>
                                <td className="border-b px-4 py-2 text-sm">{product.name}</td>
                                <td className="border-b px-4 py-2 text-sm">{product.quantity}</td>
                                <td className="border-b px-4 py-2 text-sm">
                                    <FontAwesomeIcon className='text-sm text-gray-400 rounded-full hover:bg-gray-200 p-1'
                                                    icon={faXmark} onClick={() => removeProductFromCart(index)}
                                     />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col justify-center items-center h-1/2">
                    <p className="text-gray-400 text-sm">No products in cart</p>
                    <p className="text-gray-400 text-sm">Add products to cart to make a sale</p>
                </div>
            )}
        </div>
    );
};
export default CartCard;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';


const CartCard = ({products, removeProductFromCart}) => {

    return(
        <div className='h-96 border rounded-xl shadow-sm overflow-hidden'>
            <h2 className='p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                CART
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faCartShopping} />
            </h2>
            {/* conditionally render list of producst if added to cart */}
            {products.length > 0 ? (
                <table className="w-full border-collapse overflow-hidden">
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
                                    <FontAwesomeIcon className='text-sm text-gray-200'
                                                    icon={faXmark} onClick={() => removeProductFromCart(index)}
                                     />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col justify-center items-center h-[80%]">
                    <p className="text-gray-400 text-sm">No products in cart</p>
                    <p className="text-gray-400 text-sm">Add products to cart to make a sale</p>
                </div>
            )}
        </div>
    );
};
export default CartCard;
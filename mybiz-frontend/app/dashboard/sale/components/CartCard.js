import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const CartCard = () => {
    const data = [
        { item: 'Neocidal', qty: 5, sellingPrice: 'Ksh 5000', manufacturer: 'Company A' },
        { item: 'Okra', qty: 10, sellingPrice: 'Ksh 3000', manufacturer: 'Company B' },
        { item: 'Kungunil', qty: 8, sellingPrice: 'Ksh 4000', manufacturer: 'Company C' },
        { item: 'Tomato', qty: 15, sellingPrice: 'Ksh 2000', manufacturer: 'Company D' },
        { item: 'Maize', qty: 12, sellingPrice: 'Ksh 2500', manufacturer: 'Company E' },
        { item: 'Rice', qty: 30, sellingPrice: 'Ksh 3500', manufacturer: 'Company F' },
        { item: 'Wheat', qty: 20, sellingPrice: 'Ksh 2800', manufacturer: 'Company G' },
    ];
    const cart = []

    const addToCart = () => {


    };

    return(
        <div className='h-[60%] border rounded-xl shadow-sm overflow-y-scroll'>
            <h2 className='p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                CART
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faCartShopping} />
            </h2>
            <table className='w-full'>
                <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr>
                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Item</th>
                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Qty</th>
                        <th className="border-b px-4 py-2 text-left text-sm text-gray-600">Selling Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 h-[2%]" onClick={addToCart}>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.item}</td>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.qty}</td>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.sellingPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default CartCard;
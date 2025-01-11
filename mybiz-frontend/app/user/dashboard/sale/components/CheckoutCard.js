import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import getProductCount from '../../../../lib/productCount';

const CheckoutCard = ({ total, products, session, setCart }) => {
    const [discount, setDiscount] = useState(0.0);
    const [paymentMethod, setPaymentMethod] = useState('Cash');

    const productAndCount = getProductCount(products);
    const handleCheckoutCreateSale = async () => {

        if (discount < 0) {
            toast.error('Discount cannot be less than Kes 0');
            return;
        }
        const data = {
            'sales_data': {
                'products': productAndCount,
                'discount': discount,
                'payment_method': paymentMethod
            }
        };

        try {
            const response = await axios.post('http://localhost:8000/api/v1/sales/', data, {
                headers: {
                    "Authorization": `Bearer ${session?.user?.access}`,
                }
            });
            if (response.status === 201) {
                toast.success('Sale was successfully completed!');
                setCart([]);
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('Unable to create sale, please try again');
            }
        }
    };

    return (
        <div className='absolute bottom-0 left-0 md:relative border shadow-sm w-full md:h-1/2'>
            <div className='p-4 text-gray-600 font-bold  hidden md:flex justify-between items-center bg-white'>
                <h2>CHECKOUT</h2>
                <FontAwesomeIcon aria-hidden='true' className='text-sm text-gray-600' icon={faMoneyBillWave} />
            </div>
            <div className='flex flex-col px-4 space-y-2 bg-[#F8FAFC]'>
                {/* Discount */}
                <div className="flex flex-row space-x-2 pt-2 items-center">
                    <label htmlFor="discount" className="text-sm font-medium text-gray-600">Discount:</label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={(e) => { setDiscount(parseFloat(e.target.value)) }}
                        className="text-sm w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                {/* Payment Methods */}
                <div className="flex flex-row space-x-2">
                    <span className="text-sm font-medium text-gray-500">Payment Method:</span>
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            id="mpesa"
                            name="payment_method"
                            value="Mpesa"
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                            className="text-purple-600 focus:ring-2 focus:ring-purple-600"
                        />
                        <label htmlFor="mpesa" className="text-sm font-medium text-gray-600">
                            M-pesa
                        </label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            id="cash"
                            name="payment_method"
                            value="Cash"
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                            className="text-purple-600 focus:ring-2 focus:ring-purple-600"
                        />
                        <label htmlFor="cash" className="text-sm font-medium text-gray-600">Cash</label>
                    </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
                    <span className="text-sm text-gray-500">Grand Total:</span>
                    <span className="text-purple-700"><span className='text-sm'>KES </span>{total ? total - discount : 0}</span>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckoutCreateSale}
                    className=" p-0 w-full bg-purple-600 text-white font-medium text-sm py-2  transition duration-200 hover:bg-purple-700 shadow-sm"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CheckoutCard;
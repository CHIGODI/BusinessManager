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
        <div className='hidden md:block border rounded-xl shadow-sm h-1/2 bg-white'>
            <h2 className='p-4 text-gray-600 font-bold rounded-xl flex justify-between items-center bg-white'>
                CHECKOUT
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faMoneyBillWave} />
            </h2>
            <div className='flex flex-col px-4 bg-[#F8FAFC]'>
                <div className="flex flex-col space-x-4 py-2">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="discount" className="text-sm">Discount</label>
                        <input type="number" id="discount" value={discount} onChange={(e) => { setDiscount(parseFloat(e.target.value)) }} className="text-sm w-1/4 p-1 border border-gray-200 rounded-xl outline-none focus:outline-purple-600 bg-[#F8FAFC]" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="radio" id="mpesa" name="payment_method" value="Mpesa" onChange={(e) => { setPaymentMethod(e.target.value) }} className="text-sm" />
                        <label htmlFor="mpesa" className="text-sm text-green-600">M<span className='text-red-500'>-</span>pesa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="radio" id="cash" name="payment_method" value="Cash" onChange={(e) => { setPaymentMethod(e.target.value) }} className="text-sm" />
                        <label htmlFor="cash" className="text-sm">Cash</label>
                    </div>
                </div>
                <p className='text-black font-semibold text-xl'>
                    <span className='text-sm text-gray-400'>Total Payable:</span>
                    <span className='text-gray-500 text-sm'> KES</span>
                    <span className='text-md font-bold text-gray-600'> {total ? total - discount : 0}</span>
                </p>
                <button onClick={handleCheckoutCreateSale}
                    className='w-1/2 bg-purple-600
                           text-white text-sm
                           p-2 rounded-lg
                           hover:bg-purple-700
                    '>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CheckoutCard;
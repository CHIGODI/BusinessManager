import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import CheckoutButton from './CheckoutButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const CheckoutCard = ({total, products, session}) => {
    const [discount, setDiscount] = useState(0);
    // const [paymentMethod, setPaymentMethod] = useState([]);
    const handleCheckoutCreateSale = async() => {
        console.log('products',products);

        const data = {
            'product': products,
            'discount': discount,
            'quantity': products.length,
        }
        try {
            const response = await axios.post('http://localhost:8000/api/v1/sales/',
            data,
            {
                headers: {
                    "Authorization": `Bearer ${session?.user?.access}`,
                }
            }
        );
        if (response.status === 200) {
            toast.success('Sale was succesfully completed!')
            console.log(response.data);
        }
    } catch (error) {
        if (error.response){
            toast.error(error.response)
        }
        toast.error('Unable to create sale, please try again')
        console.log(error);
    }};

    return (
        <div className='border rounded-xl shadow-sm h-1/2 bg-white'>
            <h2 className='p-4 text-gray-600 font-bold rounded-xl flex justify-between items-center bg-white'>
                CHECKOUT
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faMoneyBillWave} />
            </h2>
            <div className='flex flex-col px-4 bg-[#F8FAFC]'>
                <div className="flex flex-col space-x-4 py-2">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="discount" className="text-sm">Discount</label>
                        <input type="number" id="discount" onChange={(e) => {setDiscount(e.target.value)}} className="text-sm w-1/4 p-1 border border-gray-200 rounded-xl outline-none focus:outline-purple-600 bg-[#F8FAFC]" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="mpesa" className="text-sm" />
                        <label htmlFor="mpesa" className="text-sm text-green-600">M<span className='text-red-500'>-</span>pesa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cash" className="text-sm" />
                        <label htmlFor="cash" className="text-sm">Cash</label>
                    </div>
                </div>
                <p className='text-blackfont-semibold text-xl'>
                    <span className='text-sm text-gray-400'>Total Payable:</span>
                    <span className='text-gray-500 text-sm'> KES</span>
                    <span className='text-md font-bold text-gray-600'> {total ? total - discount : 0}</span>
                </p>
                <CheckoutButton handleCheckoutCreateSale={handleCheckoutCreateSale} />
            </div>
        </div>
    );
};
export default CheckoutCard;
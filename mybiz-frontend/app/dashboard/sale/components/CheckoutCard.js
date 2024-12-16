import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const CheckoutCard = ({total}) => {
    return (
        <div className='border rounded-xl shadow-sm h-[40%] bg-white'>
            <h2 className='p-4 text-gray-600 font-bold rounded-xl flex justify-between items-center'>
                CHECKOUT
                <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faMoneyBillWave} />
            </h2>
            <div className='flex flex-col p-4'>
                <p className='text-blackfont-semibold text-xl'>
                    <span className='text-sm text-gray-400'>Total Payable:</span>
                    <span className='text-gray-500 text-sm'> KES</span>
                    <span className='text-md font-bold text-gray-600'> {total? total: 0}</span>
                </p>
                <div className="flex items-center space-x-4 py-2">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="mpesa" className="text-sm" />
                        <label htmlFor="mpesa" className="text-sm text-green-600">M<span className='text-red-500'>-</span>pesa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cash" className="text-sm" />
                        <label htmlFor="cash" className="text-sm">Cash</label>
                    </div>
                </div>
                <button className='w-full bg-purple-600 text-white text-sm p-2 rounded-lg hover:bg-purple-700'>
                    Checkout
                </button>
            </div>
        </div>
    );
};
export default CheckoutCard;
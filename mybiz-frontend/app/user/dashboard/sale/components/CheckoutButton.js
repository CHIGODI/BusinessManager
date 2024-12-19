'use client';

const CheckoutButton = ({ handleCheckoutCreateSale }) => {
    return (
        <button onClick={handleCheckoutCreateSale}
                className='w-1/2 bg-purple-600
                           text-white text-sm
                           p-2 rounded-lg
                           hover:bg-purple-700
        '>
            Checkout
        </button>
    );
};
export default CheckoutButton;
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faCartShopping, faMoneyBillWave, faBagShopping } from '@fortawesome/free-solid-svg-icons';

const ProductListCard = ({addProductToCart}) => {
    const data = [
        {"id": "ab01ccb1-f90e-4d14-97d9-f32038f613b2", "created_at": "2024-12-14T16:24:11.213529+03:00", "updated_at": "2024-12-14T16:24:11.213547+03:00", "name": "duduthrin", "unit_buying_price": "140.00", "unit_selling_price": "200.00", "manufacturer": "Twiga", "industry": "Agriculture", "quantity": 20, "size": "50ml", "low_stock_threshold": 5},
        {
            "id": "ab02ccb1-f90e-4d14-97d9-f32038f613b3", "created_at": "2024-12-14T16:25:11.213529+03:00", "updated_at": "2024-12-14T16:25:11.213547+03:00", "name": "neocidal", "unit_buying_price": "150.00", "unit_selling_price": "220.00", "manufacturer": "Twiga", "industry": "Agriculture", "quantity": 50, "size": "100ml", "low_stock_threshold": 10
        },
        {
            "id": "ab03ccb1-f90e-4d14-97d9-f32038f613b4", "created_at": "2024-12-14T16:26:11.213529+03:00", "updated_at": "2024-12-14T16:26:11.213547+03:00", "name": "okra", "unit_buying_price": "30.00", "unit_selling_price": "45.00", "manufacturer": "GreenCo", "industry": "Agriculture", "quantity": 100, "size": "500g", "low_stock_threshold": 20
        },
        {
            "id": "ab04ccb1-f90e-4d14-97d9-f32038f613b5", "created_at": "2024-12-14T16:27:11.213529+03:00", "updated_at": "2024-12-14T16:27:11.213547+03:00", "name": "kungunil", "unit_buying_price": "110.00", "unit_selling_price": "160.00", "manufacturer": "FreshTech", "industry": "Agriculture", "quantity": 40, "size": "1kg", "low_stock_threshold": 8
        },
        {
            "id": "ab05ccb1-f90e-4d14-97d9-f32038f613b6", "created_at": "2024-12-14T16:28:11.213529+03:00", "updated_at": "2024-12-14T16:28:11.213547+03:00", "name": "tomato", "unit_buying_price": "20.00", "unit_selling_price": "30.00", "manufacturer": "VeggiePro", "industry": "Agriculture", "quantity": 200, "size": "250g", "low_stock_threshold": 50
        },
        {
            "id": "ab06ccb1-f90e-4d14-97d9-f32038f613b7", "created_at": "2024-12-14T16:29:11.213529+03:00", "updated_at": "2024-12-14T16:29:11.213547+03:00", "name": "maize", "unit_buying_price": "100.00", "unit_selling_price": "150.00", "manufacturer": "FarmTech", "industry": "Agriculture", "quantity": 75, "size": "1kg", "low_stock_threshold": 10
        }
    ]

    return(
        <div className="rounded-xl border h-[29rem]
                                    shadow-sm overflow-y-scroll scrollbar-thin
                                    scrollbar-thumb-rounded-full
                                    scrollbar-track-rounded
                                    scrollbar-thumb-gray-500
                                    scrollbar-track-gray-300
                                    bg-white"
        >
            <Link href='/products' className='hover:underline hover:text-[#01F3F]'>
                <h2 className='top-0 z-10 p-4 text-gray-600 font-bold bg-white flex justify-between items-center'>
                    ALL PRODUCTS
                    <FontAwesomeIcon aria-hidden='true' className='text-sm mt-4 text-gray-600' icon={faBagShopping} />
                </h2>
            </Link>
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
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 h-[2%]" onClick={() => { addProductToCart(row); console.log(row); }}>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.name}</td>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.quantity}</td>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.unit_selling_price}</td>
                            <td className="border-b px-4 py-2 text-sm text-[#4A4A4A]">{row.manufacturer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProductListCard;
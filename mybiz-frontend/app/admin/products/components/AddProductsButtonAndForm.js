'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductButton = (props) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: '',
        unit_buying_price: 0,
        unit_selling_price: 0,
        manufacturer: '',
        industry: '',
        quantity: 0,
        size: '',
        low_stock_threshold: 0,
    });
    const [isCustomIndustry, setIsCustomIndustry] = useState(false);


    const handleButtonClick = () => {
        setIsFormVisible(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const industries = [

        {'name':'Agriculture', 'id': 2}, {'name': 'Vetenary', 'id': 3}, {'name': 'Health', 'id': 4}
    ]
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${session?.user?.access}`,
                    }
                }
            );
            if (response.status === 201) {
                toast.success('Product added successfully');
                setIsFormVisible(false);
                setFormData({  // Reset the form
                    name: '',
                    unit_buying_price: 0,
                    unit_selling_price: 0,
                    manufacturer: '',
                    industry: '',
                    quantity: 0,
                    size: '',
                    low_stock_threshold: 0,
                });
                setIsCustomIndustry(false);
            }
            props.triggerRefresh();
        } catch (error) {
            toast.error('An error occurred. Please try again later');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <button
                onClick={handleButtonClick}
                className="px-4 py-3 bg-gray-950 text-white text-sm shadow hover:bg-opacity-[85%]"
            >
                New Product <FontAwesomeIcon className='pl-2' icon={faPlus} />
            </button>
            {isFormVisible && (
                <div
                    className="pr-1 pl-1 fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-30"
                >
                    <div className="bg-white p-6 shadow-lg w-full md:w-1/2 max-h-[596px]">
                        <h2 className="text-xl font-bold text-purple-600 mb-2">Add New Product</h2>
                        <form
                            onSubmit={handleFormSubmit}
                            className="bg-white pt-4 lg:p-6 max-h-[500px] w-full "
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {/* Product Name */}
                                <label htmlFor="name" className="self-center text-sm">Product Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Product Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                    required
                                />

                                {/* Unit Buying Price */}
                                <label htmlFor="unit_buying_price" className="self-center text-sm">Unit Buying Price</label>
                                <input
                                    type="number"
                                    id="unit_buying_price"
                                    name="unit_buying_price"
                                    placeholder="Buying Price"
                                    value={formData.unit_buying_price}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                    required
                                />

                                {/* Unit Selling Price */}
                                <label htmlFor="unit_selling_price" className="self-center text-sm">Unit Selling Price</label>
                                <input
                                    type="number"
                                    id="unit_selling_price"
                                    name="unit_selling_price"
                                    placeholder="Selling Price"
                                    value={formData.unit_selling_price}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                    required
                                />

                                {/* Manufacturer */}
                                <label htmlFor="manufacturer" className="self-center text-sm">Manufacturer</label>
                                <input
                                    type="text"
                                    id="manufacturer"
                                    name="manufacturer"
                                    placeholder="Manufacturer"
                                    value={formData.manufacturer}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                />

                                {/* Industry */}
                                <label htmlFor="industry" className="self-center text-sm">Industry</label>
                                <div className="col-span-1">
                                    {!isCustomIndustry ? (
                                        <select
                                            id="industry"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={(e) => {
                                                if (e.target.value === "Custom") {
                                                    setIsCustomIndustry(true);
                                                    setFormData({ ...formData, industry: '' });
                                                } else {
                                                    handleInputChange(e);
                                                }
                                            }}
                                            className="border p-2 focus:outline-purple-600 text-sm rounded-lg w-full"
                                            required
                                        >
                                            <option value="">Select Industry</option>
                                            {industries.map((industry) => (
                                                <option key={industry.id} value={industry.name}>
                                                    {industry.name}
                                                </option>
                                            ))}
                                            <option value="Custom">Custom</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            id="industry"
                                            name="industry"
                                            placeholder="Enter Custom Industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className="border p-2 focus:outline-purple-600 text-sm rounded-lg w-full"
                                            required
                                        />
                                    )}
                                </div>

                                {/* Quantity */}
                                <label htmlFor="quantity" className="self-center text-sm">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                    required
                                />

                                {/* Size */}
                                <label htmlFor="size" className="self-center text-sm">Size</label>
                                <input
                                    type="text"
                                    id="size"
                                    name="size"
                                    placeholder="Size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                />

                                {/* Low Stock Threshold */}
                                <label htmlFor="low_stock_threshold" className="self-center text-sm">Low Stock Threshold</label>
                                <input
                                    type="number"
                                    id="low_stock_threshold"
                                    name="low_stock_threshold"
                                    placeholder="Low Stock Threshold"
                                    value={formData.low_stock_threshold}
                                    onChange={handleInputChange}
                                    className="border p-2 focus:outline-purple-600 text-sm rounded-lg"
                                />
                            </div>

                            <div className="flex justify-end mt-4 space-x-4 lg:w-[50%] ml-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsFormVisible(false)}
                                    className="w-1/2 mr-2 px-4 py-3 bg-gray-950 text-white text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-1/2 px-4 py-3 text-white text-sm ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FCC737]'}`}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProductButton;

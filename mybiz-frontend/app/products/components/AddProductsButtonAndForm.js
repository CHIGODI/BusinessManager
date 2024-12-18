'use client';

import { useState } from 'react';

const AddProductButton = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        unit_buying_price: 0,
        unit_selling_price: 0,
        manufacturer: '',
        industry: 'Uncategorized',
        quantity: 0,
        size: '',
        low_stock_threshold: 0,
    });

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-opacity-[85%]"
            >
                Add Product
            </button>
            {isFormVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Product</h2>
                        <form
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <h2 className="text-lg font-bold mb-4">Add New Product</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Product Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="unit_buying_price"
                                    placeholder="Buying Price"
                                    value={formData.unit_buying_price}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="unit_selling_price"
                                    placeholder="Selling Price"
                                    value={formData.unit_selling_price}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="manufacturer"
                                    placeholder="Manufacturer"
                                    value={formData.manufacturer}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder="Industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="size"
                                    placeholder="Size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="number"
                                    name="low_stock_threshold"
                                    placeholder="Low Stock Threshold"
                                    value={formData.low_stock_threshold}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormVisible(false)}
                                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Save
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

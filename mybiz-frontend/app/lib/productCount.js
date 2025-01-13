const getProductCount = (products) => {
  const productCount = products.reduce((acc, product) => {
    if (acc[product.id]) {
      acc[product.id].quantity_bought += 1;
    } else {
      acc[product.id] = { id: product.id, quantity_bought: 1 };
    }
    return acc;
  }, {});

  return Object.values(productCount);
};


// products = [
//     {
//         "id": "ab01ccb1-f90e-4d14-97d9-f32038f613b2",
//         "created_at": "2024-12-14T16:24:11.213529+03:00",
//         "updated_at": "2025-01-06T18:55:00.624500+03:00",
//         "name": "duduthrin",
//         "unit_buying_price": "140.00",
//         "unit_selling_price": "200.00",
//         "manufacturer": "Twiga",
//         "industry": "Agriculture",
//         "low_stock_threshold": 5,
//         "quantity": 1
//     },
//     {
//         "id": "ab01ccb1-f90e-4d14-97d9-f32038f613b2",
//         "created_at": "2024-12-14T16:24:11.213529+03:00",
//         "updated_at": "2025-01-06T18:55:00.624500+03:00",
//         "name": "duduthrin",
//         "unit_buying_price": "140.00",
//         "unit_selling_price": "200.00",
//         "manufacturer": "Twiga",
//         "industry": "Agriculture",
//         "low_stock_threshold": 5,
//         "quantity": 1
//     },
//     {
//         "id": "7f25cc9a-24b1-4867-bf93-8e730d870a4a",
//         "created_at": "2025-01-06T17:12:57.010738+03:00",
//         "updated_at": "2025-01-06T18:55:00.627915+03:00",
//         "name": "Okra Pusa Sawani",
//         "unit_buying_price": "35.00",
//         "unit_selling_price": "50.00",
//         "manufacturer": "Continental Seeds",
//         "industry": "Agriculture",
//         "low_stock_threshold": 24,
//         "quantity": 70
//     }
// ]

// getProductCount(products)
// console.log(getProductCount(products))


export default getProductCount;
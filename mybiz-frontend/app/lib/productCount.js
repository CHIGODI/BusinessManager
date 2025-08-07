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

export default getProductCount;
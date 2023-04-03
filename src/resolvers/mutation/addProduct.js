export const addProduct = async (_, { product }, { dataSources }) => {
  try {
    const newProduct = await dataSources.product.addProduct({
      ...product,
    });

    await dataSources.price.addPrice({
      amount: product.price.amount,
      productId: newProduct.id,
    });

    return {
      ...newProduct,
      id: newProduct.id[0].id,
      __typename: 'Product',
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: error.message,
    };
  }
};

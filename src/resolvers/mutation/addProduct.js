export const addProduct = async (_, { product }, { dataSources, pubsub }) => {
  try {
    const newProduct = await dataSources.product.addProduct({
      ...product,
    });

    await dataSources.price.addPrice({
      amount: product.price.amount,
      productId: newProduct.id,
    });

    pubsub.publish('PRODUCT_CREATED', {
      productCreated: {
        ...newProduct,
        id: newProduct.id[0].id,
        __typename: 'Product',
      },
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

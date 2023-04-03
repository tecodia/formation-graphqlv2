export const products = async (_, __, { dataSources }) => {
  return dataSources.product.getProducts();
};

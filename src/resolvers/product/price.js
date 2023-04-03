export const price = async (parent, args, context, info) => {
  const priceForProduct = await context.dataSources.price.getPriceByProductId(parent.id);

  if (!priceForProduct) {
    return { id: '0', amount: 0 };
  }
  return priceForProduct[0];
};

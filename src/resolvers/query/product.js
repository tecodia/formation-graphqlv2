export const product = async (parent, args, context, info) => {
  return context.dataSources.product.getProductById(args.id);
};

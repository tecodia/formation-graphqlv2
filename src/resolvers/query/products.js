export const products = async (_, { first, after }, { dataSources }) => {
  const productspg = await dataSources.product.getProducts(first + 1, after ?? 0);

  return {
    edges: productspg.slice(0, first).map((product) => ({
      cursor: product.id,
      node: product,
    })),
    pageInfo: {
      hasNextPage: productspg.length > first,
      endCursor: productspg.slice(0, first)[first - 1].id,
    },
  };
};

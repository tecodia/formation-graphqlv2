export const fruits = async (_, __, { dataSources }) => {
  const fruitsApi = await dataSources.fruit.getFruits();

  return {
    edges: fruitsApi.map((fruit) => ({
      cursor: fruit.id,
      node: fruit,
    })),
    pageInfo: {
      hasNextPage: false,
      endCusor: fruitsApi[fruitsApi.length - 1].id,
    },
  };
};

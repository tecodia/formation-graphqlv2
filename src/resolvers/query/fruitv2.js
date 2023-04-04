export const fruitV2 = async (_, { id }, { dataSources }) => {
  const fruitApi = await dataSources.fruit.getFruit(id);

  return fruitApi;
};

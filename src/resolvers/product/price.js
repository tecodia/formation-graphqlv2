import axios from 'axios';

export const price = async (parent, args, context, info) => {
  const { data } = await axios.get(`https://622f37793ff58f023c19ba2c.mockapi.io/price`);

  const priceForProduct = data.find((priceApi) => {
    return parseInt(priceApi.productId, 10) === parseInt(parent.id, 10);
  });

  if (!priceForProduct) {
    return { id: '0', amount: 0 };
  }
  return priceForProduct;
};

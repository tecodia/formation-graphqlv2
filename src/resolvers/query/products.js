import axios from 'axios';

export const products = async () => {
  const productsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/product');

  return productsApi.data;
};

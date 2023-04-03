import axios from 'axios';

export const products = async () => {
  const productsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/product');
  const commentsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/comment');

  const productsWithPrice = productsApi.data.map((product) => {
    const commentsProduct = commentsApi.data.filter(
      (comment) => parseInt(comment.productId, 10) === parseInt(product.id, 10)
    );

    return { ...product, comments: commentsProduct };
  });

  return productsWithPrice;
};

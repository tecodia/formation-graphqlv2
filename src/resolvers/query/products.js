import axios from 'axios';

export const products = async () => {
  const productsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/product');
  const pricesApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/price');
  const commentsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/comment');
  const authorsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/author');

  const productsWithPrice = productsApi.data.map((product) => {
    const priceProduct = pricesApi.data.find((price) => parseInt(price.productId, 10) === parseInt(product.id, 10));
    const commentsProduct = commentsApi.data.filter(
      (comment) => parseInt(comment.productId, 10) === parseInt(product.id, 10)
    );

    const commentsWithAuthor = commentsProduct.map((comment) => {
      const authorComment = authorsApi.data.find(
        (author) => parseInt(author.id, 10) === parseInt(comment.authorId, 10)
      );
      return { ...comment, author: authorComment };
    });

    return { ...product, price: priceProduct || { id: '0', amount: 0 }, comments: commentsWithAuthor };
  });

  return productsWithPrice;
};

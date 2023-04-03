import axios from 'axios';

export const comments = async (parent, args, context, info) => {
  const commentsApi = await axios.get('https://622f37793ff58f023c19ba2c.mockapi.io/comment');

  const commentsForProduct = commentsApi.data.filter((comment) => {
    return parseInt(comment.productId, 10) === parseInt(parent.id, 10);
  });

  if (!commentsForProduct) {
    return [];
  }

  return commentsForProduct;
};

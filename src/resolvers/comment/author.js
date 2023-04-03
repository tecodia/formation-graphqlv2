import axios from 'axios';

export const author = async (parent, args, context, info) => {
  try {
    const { data } = await axios.get(`https://622f37793ff58f023c19ba2c.mockapi.io/author/${parent.authorId}`);
    return data;
  } catch (error) {
    return null;
  }
};

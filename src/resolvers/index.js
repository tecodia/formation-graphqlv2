import { products } from './query/products';
import { author } from './comment/author';
import { price } from './product/price';
import { comments } from './product/comments';
import { product } from './query/product';
import { addComment } from './mutation/addComment';

export const resolvers = {
  Query: {
    products,
    product,
  },
  Mutation: {
    addComment,
  },
  Comment: {
    author,
  },
  Product: {
    price,
    comments,
  },
};

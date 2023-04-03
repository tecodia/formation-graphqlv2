import { products } from './query/products';
import { author } from './comment/author';
import { price } from './product/price';
import { comments } from './product/comments';
import { product } from './query/product';

export const resolvers = {
  Query: {
    products,
    product,
  },
  Comment: {
    author,
  },
  Product: {
    price,
    comments,
  },
};

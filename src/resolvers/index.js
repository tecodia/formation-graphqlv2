import { products } from './query/products';
import { author } from './comment/author';
import { price } from './product/price';

export const resolvers = {
  Query: {
    products,
  },
  Comment: {
    author,
  },
  Product: {
    price,
  },
};

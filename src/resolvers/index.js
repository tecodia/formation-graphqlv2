import { products } from './query/products';
import { author } from './comment/author';
import { price } from './product/price';
import { comments } from './product/comments';
import { product } from './query/product';
import { addComment } from './mutation/addComment';
import { addProduct } from './mutation/addProduct';
import { subscribe } from './subscription/productCreated';
import { subscribe as subscribeCreatedComment } from './subscription/commentCreated';
import { fruits } from './query/fruits';
import { fruitV2 } from './query/fruitv2';

export const resolvers = {
  Query: {
    products,
    product,
    fruitsv2: fruits,
    fruitv2: fruitV2,
  },
  Mutation: {
    addComment,
    addProduct,
  },
  Comment: {
    author,
  },
  Product: {
    price,
    comments,
  },
  Subscription: {
    productCreated: {
      subscribe,
    },
    commentCreated: {
      subscribe: subscribeCreatedComment,
    },
  },
};

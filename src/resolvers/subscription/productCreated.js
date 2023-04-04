export const subscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator(['PRODUCT_CREATED']);
};

export const subscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator(['COMMENT_CREATED']);
};

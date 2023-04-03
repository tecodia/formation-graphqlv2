export const comments = async (parent, args, context, info) => {
  return context.dataSources.comment.getCommentsByProductId(parent.id);
};

export const comments = async (parent, args, context, info) => {
  const commentsPg = await context.dataSources.comment.getCommentsByProductId(parent.id);
  if (args.reviewMoreThan) {
    return commentsPg.filter((comment) => parseInt(comment.review, 10) > parseInt(args.reviewMoreThan, 10));
  }

  return commentsPg;
};

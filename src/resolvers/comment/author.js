export const author = async (parent, args, context, info) => {
  const authorPg = await context.dataSources.author.getAuthorById(parent.author_id);
  return authorPg;
};

export const addComment = async (_, { comment }, { dataSources }) => {
  try {
    const newComment = await dataSources.comment.addComment(comment);
    return {
      ...newComment,
      __typename: 'Comment',
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: error.message,
    };
  }
};

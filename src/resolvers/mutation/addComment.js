export const addComment = async (_, { comment }, { dataSources, pubsub }) => {
  try {
    const newComment = await dataSources.comment.addComment(comment);
    pubsub.publish('COMMENT_CREATED', { commentCreated: newComment });

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

import SQLCollector from './sql-collector';

export default {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        const sqlExtension = {
          executionTime: SQLCollector.executionTime,
          numbersOfQueries: SQLCollector.queries.length,
          queries: SQLCollector.queries,
        };

        // eslint-disable-next-line no-param-reassign
        requestContext.response.body.singleResult.extensions = {
          ...requestContext.response.body.singleResult.extensions,
          sqlExtension,
        };

        SQLCollector.reset();
      },
    };
  },
};

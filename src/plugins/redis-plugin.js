import RedisCollector from './redis-collector';

export default {
  requestDidStart() {
    return {
      willSendResponse(requestContext) {
        const redisExtension = {
          numbersOfGet: RedisCollector.getInfos.length,
          numbersOfSet: RedisCollector.setInfos.length,
          getInfos: RedisCollector.getInfos,
          setInfos: RedisCollector.setInfos,
        };

        // eslint-disable-next-line no-param-reassign
        requestContext.response.body.singleResult.extensions = {
          ...requestContext.response.body.singleResult.extensions,
          redisExtension,
        };

        RedisCollector.reset();
      },
    };
  },
};

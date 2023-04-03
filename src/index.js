import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Keyv from 'keyv';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { ProductDataSource } from './dataSources/product';
import knexConnection from './config/db';
import { PriceDataSource } from './dataSources/price';
import { CommentDataSource } from './dataSources/comment';
import { AuthorDataSource } from './dataSources/author';
import sqlPlugin from './plugins/sqlPlugin';
import { MyKeyvAdapter } from './cache/MyKeyvAdapter';
import redisPlugin from './plugins/redis-plugin';

const cache = new MyKeyvAdapter(new Keyv('redis://localhost:6382'));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typeDefs(),
  resolvers,
  plugins: [sqlPlugin, redisPlugin],
  cache,
});

export default (async function () {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      const product = new ProductDataSource(knexConnection);
      const price = new PriceDataSource(knexConnection);
      const comment = new CommentDataSource(knexConnection);
      const author = new AuthorDataSource(knexConnection, cache);
      return {
        cache,
        dataSources: {
          product,
          price,
          comment,
          author,
        },
      };
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();

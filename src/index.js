import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { ProductDataSource } from './dataSources/product';
import knexConnection from './config/db';
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typeDefs(),
  resolvers,
});

export default (async function () {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      const product = new ProductDataSource(knexConnection);
      return {
        dataSources: {
          product,
        },
      };
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();

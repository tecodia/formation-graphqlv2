import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { ProductDataSource } from './dataSources/product';
import knexConnection from './config/db';
import { PriceDataSource } from './dataSources/price';
import { CommentDataSource } from './dataSources/comment';
import { AuthorDataSource } from './dataSources/author';
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
      const price = new PriceDataSource(knexConnection);
      const comment = new CommentDataSource(knexConnection);
      const author = new AuthorDataSource(knexConnection);
      return {
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

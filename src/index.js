import { ApolloServer } from '@apollo/server';
import Keyv from 'keyv';
import { GraphQLError } from 'graphql';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PubSub } from 'graphql-subscriptions';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { stitchSchemas } from '@graphql-tools/stitch';
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
import { FruitAPI } from './dataSources/fruit';

export default (async function () {
  const pubsub = new PubSub();
  const cache = new MyKeyvAdapter(new Keyv('redis://localhost:6382'));

  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs: typeDefs(), resolvers });

  const executor = buildHTTPExecutor({
    endpoint: 'https://fruits-api.netlify.app/graphql',
  });
  const schemaFruit = await schemaFromExecutor(executor);

  const subschema = {
    schema: schemaFruit,
    executor,
  };

  const gatewaySchema = stitchSchemas({
    subschemas: [schema, subschema],
  });

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema: gatewaySchema,
      context: async (ctx, msg, args) => {
        // You can define your own function for setting a dynamic context
        // or provide a static value
        return {
          pubsub,
        };
      },
    },
    wsServer
  );

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema: gatewaySchema,
    plugins: [
      redisPlugin,
      sqlPlugin,
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const product = new ProductDataSource(knexConnection);
        const price = new PriceDataSource(knexConnection, cache);
        const comment = new CommentDataSource(knexConnection);
        const author = new AuthorDataSource(knexConnection, cache);
        const fruit = new FruitAPI();
        return {
          cache,
          pubsub,
          dataSources: {
            product,
            price,
            comment,
            author,
            fruit,
          },
        };
      },
    })
  );

  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
})();

import http from 'http';
import dotenv from 'dotenv';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

dotenv.config();

import { logger } from './logger.js';
import { getApp } from './app.js';
import { getApollo } from './apollo.js';

getApp().then((app) => {

  const server = http.createServer(app);

  let subscriptionServer = null;

  server
    .listen(process.env.PORT, () => {
  
      subscriptionServer = new SubscriptionServer({
        execute,
        subscribe,
        typeDefs,
        resolvers,
      }, {
        server: server,
        path: '/graphql',
      });

    })
    .on('listening', async () => {
      logger.info(
        `web server listening on port http://localhost:${process.env.PORT}${(await getApollo()).graphqlPath}`,
      );
      logger.info(
        `web socket server listening on port ws://localhost:${process.env.PORT}${subscriptionServer.wsServer.options.path}`,
      );
    })
    .on('error', (err) => {
      console.log(err);
    });

});


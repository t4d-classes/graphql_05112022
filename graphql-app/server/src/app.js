import express from 'express';
import httpProxy from 'http-proxy';
import path from 'path';

import { logger } from './logger.js';
import { getApollo } from './apollo.js';

let app = null;

export const getApp = async () => {

  if (app) {
    return app;
  }

  const proxy = httpProxy.createProxyServer({});

  app = express();
  
  (await getApollo()).applyMiddleware({ app, path: '/graphql' });
  
  app.use('/', function app(req, res) {
    proxy.web(
      req,
      res,
      { target: 'http://localhost:3000' },
      function proxyWebErrorHandler(err) {
        logger.error(err.message);
        res.sendFile(path.resolve('./public/index.html'));
      },
    );
  });

  return app; 

};


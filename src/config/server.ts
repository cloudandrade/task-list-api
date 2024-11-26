import express from 'express';
import bodyParser from 'body-parser';
import logger from '#utils/logger';
import routes from '#routes/index';
import setupSwagger from './swaggerConfig';
import cors from 'cors';

const server = express();

setupSwagger(server);

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(routes);

server.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default server;
import server from '#config/server';
import { config } from '#utils/constants';
import db from '#config/dbConfig';
import logger from '#utils/logger';

async function startServer() {
  await db.authenticate();

  server.listen(config.port,() => {
    logger.info(`Server is running on port ${config.port}`);
  });

}

startServer();
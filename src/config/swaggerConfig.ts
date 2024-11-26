import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';

const setupSwagger = (app: Express) => {
  const swaggerFilePath = path.resolve(__dirname, '../docs/swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;

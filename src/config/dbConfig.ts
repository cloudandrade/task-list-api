import { Sequelize } from 'sequelize';
import logger from '#utils/logger';

class Database {
  private static instance: Sequelize | null = null;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const dbname = process.env.DBNAME || 'todolist';
      const dbuser = process.env.DBUSER || 'root';
      const dbpass = process.env.DBPASS || 'root';
      const dbhost = process.env.DBHOST || 'localhost';

      Database.instance = new Sequelize(dbname, dbuser, dbpass, {
        host: dbhost,
        dialect: 'mysql',
        logging: (msg) => logger.debug(msg), // Log SQL no logger
      });
    }
    return Database.instance;
  }

  public static async authenticate(): Promise<void> {
    try {
      const sequelize = Database.getInstance();
      await sequelize.authenticate();
      logger.info('Banco de dados conectado com sucesso.');
    } catch (error) {
      logger.error('Não foi possível se conectar ao banco de dados:', error);
      throw error;
    }
  }
}

export default Database;
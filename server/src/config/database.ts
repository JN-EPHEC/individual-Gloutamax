import { Sequelize } from 'sequelize';
class Database {
  // Stocke l'unique instance de la connexion Sequelize
  private static instance: Sequelize;

  // Constructeur privé pour empêcher l'instanciation directe avec 'new'
  private constructor() {}

  // La méthode qui garantit une instance unique
  public static getInstance(): Sequelize {
    if (!Database.instance) {
      // Si l'instance n'existe pas, on la crée avec ta configuration
      Database.instance = process.env.DATABASE_URL
        ? new Sequelize(process.env.DATABASE_URL, {
            dialect: "postgres",
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
            logging: false,
          })
        : new Sequelize({
            username: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "postgres",
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT || 5432),
            dialect: "postgres",
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
            logging: false,
          });
    }
    
    // On retourne l'instance (nouvellement créée ou déjà existante)
    return Database.instance;
  }
}

export default Database;
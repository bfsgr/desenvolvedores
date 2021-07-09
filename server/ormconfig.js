module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts", "src/entities/*.js"],
  migrations: ["src/database/migrations/*.ts", "src/database/migrations/*.js"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
  },
};

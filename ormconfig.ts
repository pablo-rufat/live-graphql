export default {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  extra: process.env.NODE_ENV === "production" ? {
    ssl: {
      rejectUnauthorized: false
    }
  } : {},
  entities: [
     process.env.NODE_ENV === "development" ? "src/entity/**/*.ts" : "build/entity/**/*.js"
  ],
  migrations: [
   process.env.NODE_ENV === "development" ? "src/migration/**/*.ts" : "build/migration/**/*.js"
  ],
  subscribers: [
   process.env.NODE_ENV === "development" ? "src/subscriber/**/*.ts" : "build/subscriber/**/*.js"
  ],
  cli: {
     "entitiesDir": process.env.NODE_ENV === "development" ? "src/entity" : "build/entity",
     "migrationsDir": process.env.NODE_ENV === "development" ? "src/migration" : "build/migration",
     "subscribersDir": process.env.NODE_ENV === "development" ? "src/subscriber" : "build/subscriber"
  }
};
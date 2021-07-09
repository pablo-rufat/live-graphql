module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
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
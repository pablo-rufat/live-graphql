import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";
import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: path.join(__dirname, `../.env-${process.env.NODE_ENV}`) });
}

export const getUserId = (req: any): string => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AuthenticationError("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token){
    throw new AuthenticationError("Unauthorized");
  }

  let payload;

  try {
    payload = verify(token, process.env.APP_SECRET);
  } catch (e) {
    throw new AuthenticationError(e);
  }

  const payloadContent = typeof(payload) === "string" ? payload : payload.userId;

  if (!payloadContent) {
    throw new AuthenticationError("Unauthorized");
  }

  return payloadContent;
};

export const typeormOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [
     "src/entity/**/*.ts"
  ],
  migrations: [
     "src/migration/**/*.ts"
  ],
  subscribers: [
     "src/subscriber/**/*.ts"
  ],
  cli: {
     "entitiesDir": "src/entity",
     "migrationsDir": "src/migration",
     "subscribersDir": "src/subscriber"
  }
};
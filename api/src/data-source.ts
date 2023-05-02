import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Chat } from "./entity/Chat";
import { Messages } from "./entity/Message";
import { Call } from "./entity/Call";
import { Gallary } from "./entity/Gallary/Gallary";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ep-blue-pine-272939-pooler.us-west-2.postgres.vercel-storage.com",
  // host: "localhost",
  port: 5432,
  username: "default",
  // username: "sabbir",
  password: "mD0KdS8ubEBc",
  // password: undefined,
  database: "verceldb",
  // database: "vite-chat-app",
  synchronize: true,
  logging: false,
  entities: [User, Chat, Messages, Call, Gallary],
});

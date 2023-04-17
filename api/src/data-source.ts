import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Chat } from "./entity/Chat";
import { Messages } from "./entity/Message";
import { Call } from "./entity/Call";
import { Gallary } from "./entity/Gallary/Gallary";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sabbir",
  password: undefined,
  database: "vite-chat-app",
  synchronize: true,
  logging: false,
  entities: [User, Chat, Messages, Call, Gallary],
});

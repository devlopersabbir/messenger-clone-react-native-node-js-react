import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Chat } from "./entity/Chat";
import { Messages } from "./entity/Message";
import { Call } from "./entity/Call";
import { Gallary } from "./entity/Gallary/Gallary";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "dpg-ch2pa43h4hsum403h680-a",
  port: 5432,
  username: "devlopersabbir",
  password: "5z9hWFoCBvvTX6YzSja1ZyhL2zvQs3WM",
  database: "devlopersabbir_chat_app",
  synchronize: true,
  logging: false,
  entities: [User, Chat, Messages, Call, Gallary],
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Chat_1 = require("./entity/Chat");
const Message_1 = require("./entity/Message");
const Call_1 = require("./entity/Call");
const Gallary_1 = require("./entity/Gallary/Gallary");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "dpg-ch2pa43h4hsum403h680-a",
    port: 5432,
    username: "devlopersabbir",
    password: "5z9hWFoCBvvTX6YzSja1ZyhL2zvQs3WM",
    database: "devlopersabbir_chat_app",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Chat_1.Chat, Message_1.Messages, Call_1.Call, Gallary_1.Gallary],
});
//# sourceMappingURL=data-source.js.map
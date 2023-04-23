"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
class UserControllers {
    /**
     * search a user
     * METHOD -> POST
     * API URL -> /api/v1/users/search
     */
    static searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.body;
            const { uuid } = req.user;
            if (!search && typeof search !== "string")
                return res.status(400).json({ message: "Invalid input" });
            try {
                const users = yield User_1.User.find({
                    where: {
                        username: (0, typeorm_1.Like)(`%${search}%`),
                        uuid: (0, typeorm_1.Not)(uuid),
                    },
                    select: {
                        id: true,
                        uuid: true,
                        username: true,
                        name: true,
                        status: true,
                        image: true,
                    },
                    take: 5,
                });
                res.status(200).json(users);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server error!" });
            }
        });
    }
    /**
     * Get a single user
     * METHOD -> GET
     * API URL -> /api/v1/users/:uuid
     */
    static getSingleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            if (!uuid)
                return res.status(400).json({ message: "Prarams not found!" });
            try {
                const users = yield User_1.User.findOneOrFail({
                    where: {
                        uuid,
                    },
                    select: {
                        uuid: true,
                        name: true,
                        email: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        status: true,
                    },
                });
                res.status(200).json(users);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server error!" });
            }
        });
    }
}
exports.default = UserControllers;
//# sourceMappingURL=userControllers.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserRepository_1 = require("../Repository/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
class UserService {
    constructor() {
        this.reg = async (userRedData) => {
            try {
                const hashPass = await bcrypt_1.default.hash(userRedData.userPassword, 3); // хешируем пароль для хранения в базе
                const uuidActivationLink = await uuid_1.default.v4(); // генерируем строку для активации емейла
                const regUser = await UserRepository_1.userRepositoty.addUserRedDataToSQL(Object.assign(Object.assign({}, userRedData), { userPassword: hashPass, activationLink: uuidActivationLink }));
                if (Array.isArray(regUser))
                    return regUser;
                return [];
            }
            catch (error) {
                console.log(error);
                return [''];
            }
        };
    }
}
exports.userService = new UserService();

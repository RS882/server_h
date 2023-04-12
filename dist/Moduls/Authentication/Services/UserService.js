"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserRepository_1 = require("../Repository/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
const MailService_1 = require("./MailService");
const TokenService_1 = require("./TokenService");
const UserDTO_1 = require("../DTOs/UserDTO");
class UserService {
    constructor() {
        this.reg = async (userRedData) => {
            const isUserFound = await UserRepository_1.userRepositoty.searchUserData(userRedData.userEmail);
            if (isUserFound)
                throw new Error(`The user with email ${userRedData.userEmail} has already been registered`);
            const hashPass = await bcrypt_1.default.hash(userRedData.userPassword, 3); // хешируем пароль для хранения в базе
            const uuidActivationLink = uuid_1.default.v4(); // генерируем строку для активации емейла
            const regUser = await UserRepository_1.userRepositoty.addUserRedDataToSQL(Object.assign(Object.assign({}, userRedData), { userPassword: hashPass, activationLink: uuidActivationLink }));
            await MailService_1.mailService.sendActivationLink(regUser.userEmail, uuidActivationLink);
            const userDTO = new UserDTO_1.UserDTO(regUser);
            const tokens = TokenService_1.tokenService.generateTokens(Object.assign({}, userDTO));
            const saveRefreshToken = await TokenService_1.tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDTO });
        };
    }
}
exports.userService = new UserService();

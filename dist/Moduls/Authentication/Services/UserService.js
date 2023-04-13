"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const UserRepository_1 = require("../Repository/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const MailService_1 = require("./MailService");
const TokenService_1 = require("./TokenService");
const UserDTO_1 = require("../DTOs/UserDTO");
const UserAuthDTO_1 = require("../DTOs/UserAuthDTO");
const errorMessage_1 = require("../../../ErrorMessage/errorMessage");
class UserService {
    constructor() {
        this.reg = async (userRedData) => {
            const isUserFound = await UserRepository_1.userRepositoty.searchUserData(userRedData.userEmail);
            if (isUserFound)
                throw new Error(errorMessage_1.errorMessage.REPETITION_EMAIL[0] + ` ${userRedData.userEmail} ` + errorMessage_1.errorMessage.REPETITION_EMAIL[1]);
            const hashPass = await bcrypt_1.default.hash(userRedData.userPassword, 3); // хешируем пароль для хранения в базе
            const uuidActivationLink = (0, uuid_1.v4)(); // генерируем строку для активации емейла
            const regUserSQL = await UserRepository_1.userRepositoty.addUserRedDataToSQL(Object.assign(Object.assign({}, userRedData), { userPassword: hashPass, activationLink: uuidActivationLink }));
            const regUser = new UserAuthDTO_1.UserAuthDTO(regUserSQL);
            const sendMail = await MailService_1.mailService.sendActivationLink(regUser.userEmail, uuidActivationLink);
            const userDTO = new UserDTO_1.UserDTO(regUser);
            // const tt: UserAuthModel = { userEmail: '11', userId: 11, isActivated: true, userPassword: '11' }
            // const dto2 = new UserDTO(tt)
            const tokens = TokenService_1.tokenService.generateTokens(Object.assign({}, userDTO));
            const saveRefreshToken = await TokenService_1.tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDTO });
        };
    }
}
exports.userService = new UserService();

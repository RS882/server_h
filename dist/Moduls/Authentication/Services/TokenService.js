"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const TokenRepository_1 = require("../Repository/TokenRepository");
const TokenDTO_1 = require("../DTOs/TokenDTO");
class TokenService {
    constructor() {
        this.generateTokens = (payload) => {
            const accessToken = jsonwebtoken_1.default.sign(payload, process_1.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process_1.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return { accessToken, refreshToken };
        };
        this.saveToken = async (userId, refreshToken) => {
            const isTokenFoundInDB = await TokenRepository_1.tokenRepositoty.searchToken(userId);
            let token;
            if (isTokenFoundInDB) {
                const updateTokenInSQL = await TokenRepository_1.tokenRepositoty.updateToken({ userId, refreshToken });
                const updatedToken = new TokenDTO_1.TokenDTO(updateTokenInSQL);
                token = updatedToken.refreshToken;
            }
            else {
                const createTokenInSQL = await TokenRepository_1.tokenRepositoty.createToken({ userId, refreshToken });
                const createdToken = new TokenDTO_1.TokenDTO(createTokenInSQL);
                token = createdToken.refreshToken;
            }
            return token;
        };
    }
}
exports.tokenService = new TokenService();
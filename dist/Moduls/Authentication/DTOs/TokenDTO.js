"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDTO = void 0;
class TokenDTO {
    constructor(model) {
        this.id = model.id;
        this.userId = model.userId;
        this.refreshToken = model.refreshToken;
        this.userIPAdress = model.userIPAdress;
    }
}
exports.TokenDTO = TokenDTO;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegDTO = void 0;
class UserRegDTO {
    constructor(modelToken, modelUserDTO) {
        this.userId = model.id;
        this.userEmail = model.email;
        this.userPassword = model.pasword;
        this.isActivated = model.is_activated;
        this.activationLink = model.activation_link;
    }
}
exports.UserRegDTO = UserRegDTO;
;

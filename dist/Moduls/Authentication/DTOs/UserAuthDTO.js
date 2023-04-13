"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthDTO = void 0;
class UserAuthDTO {
    constructor(model) {
        this.userId = model.id;
        this.userEmail = model.email;
        this.userPassword = model.pasword;
        this.isActivated = model.is_activated;
        this.activationLink = model.activation_link;
    }
}
exports.UserAuthDTO = UserAuthDTO;
;

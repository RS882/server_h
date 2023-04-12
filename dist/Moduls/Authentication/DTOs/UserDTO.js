"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(model) {
        this.id = model.userId;
        this.email = model.userEmail;
        this.isActivate = model.isActivated;
    }
}
exports.UserDTO = UserDTO;
;

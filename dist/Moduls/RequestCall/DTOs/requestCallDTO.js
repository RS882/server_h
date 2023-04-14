"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequesCallDTOToSQL = exports.RequesCallDTOToAPI = void 0;
class RequesCallDTOToAPI {
    constructor(model) {
        this.id = model.id;
        this.phoneNumber = model.tel_number;
        this.userName = model.user_name;
    }
}
exports.RequesCallDTOToAPI = RequesCallDTOToAPI;
;
class RequesCallDTOToSQL {
    constructor(model) {
        this.tel_number = model.phoneNumber;
        this.user_name = model.userName;
    }
}
exports.RequesCallDTOToSQL = RequesCallDTOToSQL;

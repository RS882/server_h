"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberDTO = void 0;
class PhoneNumberDTO {
    constructor(model) {
        this.phoneNumber = model ? model.tel_number : '';
    }
}
exports.PhoneNumberDTO = PhoneNumberDTO;

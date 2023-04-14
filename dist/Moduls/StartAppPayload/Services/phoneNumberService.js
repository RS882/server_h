"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberService = void 0;
const phoneNumberDTO_1 = require("../DTOs/phoneNumberDTO");
const phoneNumbeRepository_1 = require("../Repository/phoneNumbeRepository");
class PhoneNumberService {
    constructor() {
        // _getAPIPhoneNumberModel = (bd?: SQLPhoneNumberMobel): APIPhoneNumberModel =>
        // 	({ phoneNumber: bd ? bd.tel_number : '', });
        this.get = async () => {
            // try {
            const resSQL = await phoneNumbeRepository_1.phoneNumberRepository.get();
            if (resSQL.length === 0)
                return new phoneNumberDTO_1.PhoneNumberDTO();
            resSQL.sort((a, b) => +a.id - b.id);
            return resSQL.filter(e => { var _a; return !!e.tel_number && ((_a = e.tel_number.match(/\d/g)) === null || _a === void 0 ? void 0 : _a.length) === 12; })
                .map(e => new phoneNumberDTO_1.PhoneNumberDTO(e))[0];
            // } catch (error) {
            // 	console.log(error);
            // 	return this._getAPIPhoneNumberModel();
            // }
        };
    }
}
exports.phoneNumberService = new PhoneNumberService();

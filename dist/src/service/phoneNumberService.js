"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberService = void 0;
const phoneNumbeRepository_1 = require("../Repository/phoneNumbeRepository");
class PhoneNumberService {
    constructor() {
        this._getAPIPhoneNumberModel = (bd) => ({ phoneNumber: bd ? bd.tel_number : '', });
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSQL = yield phoneNumbeRepository_1.phoneNumberRepository.get();
                if (resSQL.length === 0)
                    return this._getAPIPhoneNumberModel();
                return resSQL.filter(e => { var _a; return !!e.tel_number && ((_a = e.tel_number.match(/\d/g)) === null || _a === void 0 ? void 0 : _a.length) === 12; })
                    .map(e => this._getAPIPhoneNumberModel(e))[0];
            }
            catch (error) {
                console.log(error);
                return this._getAPIPhoneNumberModel();
            }
        });
    }
}
exports.phoneNumberService = new PhoneNumberService();

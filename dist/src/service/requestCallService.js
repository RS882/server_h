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
exports.requestCallService = void 0;
const requestCallRepository_1 = require("./../Repository/requestCallRepository");
class RequestCallService {
    constructor() {
        this._getAPIRequstCallModell = (db) => db ? db.map(e => ({
            id: e.id,
            userName: e.user_name,
            phoneNumber: e.tel_number,
        })) : [];
        this.get = (requestCallId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSQL = yield requestCallRepository_1.requestCallRepository.get(requestCallId);
                if (resSQL.length === 0)
                    return this._getAPIRequstCallModell();
                return this._getAPIRequstCallModell(resSQL);
            }
            catch (error) {
                console.log(error);
                return this._getAPIRequstCallModell();
            }
        });
        this.post = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSQL = yield requestCallRepository_1.requestCallRepository.post(data);
                if (resSQL.length === 0)
                    return this._getAPIRequstCallModell();
                return this._getAPIRequstCallModell(resSQL);
            }
            catch (error) {
                console.log(error);
                return this._getAPIRequstCallModell();
            }
        });
        this.delete = (requestCallId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSQL = yield requestCallRepository_1.requestCallRepository.delete(requestCallId);
                if (resSQL.length === 0)
                    return this._getAPIRequstCallModell();
                return;
            }
            catch (error) {
                console.log(error);
                return this._getAPIRequstCallModell();
            }
        });
    }
}
exports.requestCallService = new RequestCallService();

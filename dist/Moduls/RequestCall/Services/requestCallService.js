"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCallService = void 0;
const requestCallRepository_1 = require("../Repository/requestCallRepository");
class RequestCallService {
    constructor() {
        this._getAPIRequstCallModell = (db) => db ? db.map(e => ({
            id: e.id,
            userName: e.user_name,
            phoneNumber: e.tel_number,
        })) : [];
        this._getSQLRequstCallModell = (db) => ({
            user_name: db.userName,
            tel_number: db.phoneNumber,
        });
        this.get = async (requestCallId) => {
            // try {
            const resSQL = await requestCallRepository_1.requestCallRepository.get(requestCallId);
            if (resSQL.length === 0)
                return this._getAPIRequstCallModell();
            return this._getAPIRequstCallModell(resSQL);
            // } catch (error) {
            // 	console.log(error);
            // 	return this._getAPIRequstCallModell();
            // }
        };
        this.post = async (data) => {
            // try {
            const resSQL = await requestCallRepository_1.requestCallRepository.post(this._getSQLRequstCallModell(data));
            if (resSQL.length === 0)
                return this._getAPIRequstCallModell();
            return this._getAPIRequstCallModell(resSQL);
            // } catch (error) {
            // 	console.log(error);
            // 	return this._getAPIRequstCallModell();
            // }
        };
        this.delete = async (requestCallId) => {
            // try {
            const resSQL = await requestCallRepository_1.requestCallRepository.delete(requestCallId);
            if (resSQL.length === 0)
                return false;
            return true;
            // } catch (error) {
            // 	console.log(error);
            // 	return false;
            // }
        };
    }
}
exports.requestCallService = new RequestCallService();

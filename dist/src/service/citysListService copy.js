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
exports.cityListService = void 0;
const cityListRepository_1 = require("./../Repository/cityListRepository");
class CityListService {
    constructor() {
        this._getAPICitysListModel = (db) => ({ citysList: db ? db.map(e => e.city_name) : [] });
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const resSQL = yield cityListRepository_1.citysListRepository.get();
                if (resSQL.length === 0)
                    return this._getAPICitysListModel();
                return this._getAPICitysListModel(resSQL);
            }
            catch (error) {
                console.log(error);
                return this._getAPICitysListModel();
            }
        });
    }
}
exports.cityListService = new CityListService();

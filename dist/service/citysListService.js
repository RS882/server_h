"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityListService = void 0;
const cityListRepository_1 = require("./../Repository/cityListRepository");
class CityListService {
    constructor() {
        this._getAPICitysListModel = (db) => ({ citysList: db ? db.map(e => e.city_name) : [] });
        this.get = async () => {
            // try {
            const resSQL = await cityListRepository_1.citysListRepository.get();
            if (resSQL.length === 0)
                return this._getAPICitysListModel();
            return this._getAPICitysListModel(resSQL);
            // } catch (error) {
            // 	console.log(error);
            // 	return this._getAPICitysListModel();
            // }
        };
    }
}
exports.cityListService = new CityListService();

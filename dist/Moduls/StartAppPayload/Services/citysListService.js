"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityListService = void 0;
const cityListRepository_1 = require("../Repository/cityListRepository");
const citysListDTO_1 = require("../DTOs/citysListDTO");
class CityListService {
    constructor() {
        // _getAPICitysListModel = (db?: SQLCitysListModel[]): APICitysListModel =>
        // 	({ citysList: db ? db!.map(e => e.city_name) : [] });
        this.get = async () => {
            // try {
            const resSQL = await cityListRepository_1.citysListRepository.get();
            if (resSQL.length === 0)
                return new citysListDTO_1.CitysListDTO();
            return new citysListDTO_1.CitysListDTO(resSQL);
            // } catch (error) {
            // 	console.log(error);
            // 	return this._getAPICitysListModel();
            // }
        };
    }
}
exports.cityListService = new CityListService();

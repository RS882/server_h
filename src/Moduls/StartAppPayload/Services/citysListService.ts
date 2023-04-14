
import { SQLCitysListModel } from '../Models/SQLModels/SQLCitysListModel';
import { APICitysListModel } from "../Models/APIModels/APICitysListModel";
import { citysListRepository } from '../Repository/cityListRepository';



class CityListService {

	_getAPICitysListModel = (db?: SQLCitysListModel[]): APICitysListModel =>
		({ citysList: db ? db!.map(e => e.city_name) : [] });


	get = async (): Promise<APICitysListModel> => {
		// try {
		const resSQL = await citysListRepository.get();
		if (resSQL.length === 0) return this._getAPICitysListModel();
		return this._getAPICitysListModel(resSQL);

		// } catch (error) {
		// 	console.log(error);
		// 	return this._getAPICitysListModel();
		// }
	};
}
export const cityListService = new CityListService();
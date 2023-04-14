
import { SQLCitysListModel } from '../Models/SQLModels/SQLCitysListModel';
import { APICitysListModel } from "../Models/APIModels/APICitysListModel";
import { citysListRepository } from '../Repository/cityListRepository';
import { CitysListDTO } from '../DTOs/citysListDTO';



class CityListService {

	// _getAPICitysListModel = (db?: SQLCitysListModel[]): APICitysListModel =>
	// 	({ citysList: db ? db!.map(e => e.city_name) : [] });


	get = async (): Promise<APICitysListModel> => {
		// try {
		const resSQL = await citysListRepository.get();
		if (resSQL.length === 0) return new CitysListDTO();
		return new CitysListDTO(resSQL);

		// } catch (error) {
		// 	console.log(error);
		// 	return this._getAPICitysListModel();
		// }
	};
}
export const cityListService = new CityListService();
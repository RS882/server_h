import { APICitysListModel } from "../Models/APIModels/APICitysListModel";
import { SQLCitysListModel } from "../Models/SQLModels/SQLCitysListModel";

export class CitysListDTO implements APICitysListModel {
	citysList;
	constructor(model?: SQLCitysListModel[]) {
		this.citysList = model ? model!.map(e => e.city_name) : [];
	}

}


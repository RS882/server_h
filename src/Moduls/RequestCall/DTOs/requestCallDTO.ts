
import { SQLRequestCallModel } from '../Models/SQLModels/SQLRequestCallModel';
import { APIRequestCallModel } from './../Models/APIModels/APIRequestCallModel';



export class RequesCallDTOToAPI implements APIRequestCallModel {
	id;
	userName;
	phoneNumber;
	constructor(model: SQLRequestCallModel) {
		this.id = model.id;
		this.phoneNumber = model.tel_number;
		this.userName = model.user_name;
	}
};

export class RequesCallDTOToSQL implements SQLRequestCallModel {
	user_name;
	tel_number;
	constructor(model: APIRequestCallModel) {
		this.tel_number = model.phoneNumber;
		this.user_name = model.userName;
	}

}



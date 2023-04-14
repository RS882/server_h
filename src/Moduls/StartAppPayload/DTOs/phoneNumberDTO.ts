import { APIPhoneNumberModel } from "../Models/APIModels/APIPhoneNumberModel";
import { SQLPhoneNumberMobel } from "../Models/SQLModels/SQLPhoneNumberMobel";

export class PhoneNumberDTO implements APIPhoneNumberModel {
	phoneNumber;
	constructor(model?: SQLPhoneNumberMobel) {
		this.phoneNumber = model ? model.tel_number : '';
	}
}





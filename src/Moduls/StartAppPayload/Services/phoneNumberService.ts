


import { PhoneNumberDTO } from "../DTOs/phoneNumberDTO";
import { APIPhoneNumberModel } from "../Models/APIModels/APIPhoneNumberModel";
import { phoneNumberRepository } from "../Repository/phoneNumbeRepository";
import { SQLPhoneNumberMobel } from './../Models/SQLModels/SQLPhoneNumberMobel';




class PhoneNumberService {
	// _getAPIPhoneNumberModel = (bd?: SQLPhoneNumberMobel): APIPhoneNumberModel =>
	// 	({ phoneNumber: bd ? bd.tel_number : '', });

	get = async (): Promise<APIPhoneNumberModel> => {
		// try {
		const resSQL = await phoneNumberRepository.get();
		if (resSQL.length === 0) return new PhoneNumberDTO();
		resSQL.sort((a, b) => +a.id - b.id);
		return resSQL.filter(e => !!e.tel_number && e.tel_number.match(/\d/g)?.length === 12)
			.map(e => new PhoneNumberDTO(e))[0];
		// } catch (error) {
		// 	console.log(error);
		// 	return this._getAPIPhoneNumberModel();
		// }
	};
}
export const phoneNumberService = new PhoneNumberService();
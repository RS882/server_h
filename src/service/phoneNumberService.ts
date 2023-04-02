import { ITelNumer } from "../db/db";
import { APIPhoneNumberModel } from "../models/APIModels/APIPhoneNumberModel";

import { phoneNumberRepository } from "../Repository/phoneNumbeRepository";
import { SQLPhoneNumberMobel } from '../Repository/SQLModels/SQLPhoneNumberMobel';



class PhoneNumberService {
	_getAPIPhoneNumberModel = (bd?: SQLPhoneNumberMobel): APIPhoneNumberModel =>
		({ phoneNumber: bd ? bd.tel_number : '', });

	get = async (): Promise<APIPhoneNumberModel | undefined> => {
		try {
			const resSQL = await phoneNumberRepository.get();
			if (resSQL.length === 0) return this._getAPIPhoneNumberModel();
			return resSQL.filter(e => !!e.tel_number && e.tel_number.match(/\d/g)?.length === 12)
				.map(e => this._getAPIPhoneNumberModel(e))[0];
		} catch (error) {
			console.log(error);
			return this._getAPIPhoneNumberModel();
		}
	};
}
export const phoneNumberService = new PhoneNumberService();
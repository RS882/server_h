

import { APIRequestCallModel } from './../models/APIModels/APIRequestCallModel';
import { SQLRequestCallModel } from './../models/SQLModels/SQLRequestCallModel';
import { requestCallRepository } from './../Repository/requestCallRepository';
import { URIParamsRequestCallIdModel } from '../models/URIParamsUserIdModel';
import { QueryResult } from 'pg';
import { SQLRequestCallIdModel } from '../models/SQLModels/SQLRequestCallIdModel';



class RequestCallService {

	_getAPIRequstCallModell = (db?: SQLRequestCallModel[]): APIRequestCallModel[] | [] =>
		db ? db.map(e => ({
			id: e.id,
			userName: e.user_name,
			phoneNumber: e.tel_number,
		})) : [];

	_getSQLRequstCallModell = (db: APIRequestCallModel): SQLRequestCallModel =>
	({
		user_name: db.userName,
		tel_number: db.phoneNumber,
	});


	get = async (requestCallId?: URIParamsRequestCallIdModel): Promise<APIRequestCallModel[] | []> => {
		try {
			const resSQL: SQLRequestCallModel[] = await requestCallRepository.get(requestCallId);
			if (resSQL.length === 0) return this._getAPIRequstCallModell();
			return this._getAPIRequstCallModell(resSQL);
		} catch (error) {
			console.log(error);
			return this._getAPIRequstCallModell();
		}
	};

	post = async (data: APIRequestCallModel): Promise<[] | APIRequestCallModel[]> => {
		try {
			const resSQL: SQLRequestCallModel[] =
				await requestCallRepository.post(this._getSQLRequstCallModell(data));
			if (resSQL.length === 0) return this._getAPIRequstCallModell();
			return this._getAPIRequstCallModell(resSQL);
		} catch (error) {
			console.log(error);
			return this._getAPIRequstCallModell();
		}

	};

	delete = async (requestCallId: URIParamsRequestCallIdModel): Promise<boolean> => {
		try {
			const resSQL: SQLRequestCallIdModel[] = await requestCallRepository.delete(requestCallId);
			if (resSQL!.length === 0) return false;
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
export const requestCallService = new RequestCallService();
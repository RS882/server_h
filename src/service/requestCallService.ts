

import { APIRequestCallModel } from './../models/APIModels/APIRequestCallModel';
import { SQLRequestCallModel } from './../models/SQLModels/SQLRequestCallModel';
import { requestCallRepository } from './../Repository/requestCallRepository';
import { URIParamsRequestCallIdModel } from '../models/URIParamsUserIdModel';
import { QueryResult } from 'pg';



class RequestCallService {

	_getAPIRequstCallModell = (db?: SQLRequestCallModel[]): APIRequestCallModel[] | [] =>
		db ? db.map(e => ({
			id: e.id,
			userName: e.user_name,
			phoneNumber: e.tel_number,
		})) : [];


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

	post = async (data: SQLRequestCallModel) => {
		try {
			const resSQL: SQLRequestCallModel[] = await requestCallRepository.post(data);
			if (resSQL.length === 0) return this._getAPIRequstCallModell();
			return this._getAPIRequstCallModell(resSQL);
		} catch (error) {
			console.log(error);
			return this._getAPIRequstCallModell();
		}

	};

	delete = async (requestCallId: URIParamsRequestCallIdModel) => {
		try {
			const resSQL: undefined | never[] = await requestCallRepository.delete(requestCallId);
			if (resSQL!.length === 0) return this._getAPIRequstCallModell();
			return;
		} catch (error) {
			console.log(error);
			return this._getAPIRequstCallModell();
		}
	}
}
export const requestCallService = new RequestCallService();
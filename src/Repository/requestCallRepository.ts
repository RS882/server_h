
import { db } from '../db/db';
import { QueryResult, Pool } from 'pg';


import { SQLRequestCallModel } from '../models/SQLModels/SQLRequestCallModel';
import { URIParamsRequestCallIdModel } from './../models/URIParamsUserIdModel';
import { SQLRequestCallIdModel } from '../models/SQLModels/SQLRequestCallIdModel';


class RequestCallRepository {
	db: Pool;
	query: {
		get: string;
		post: string;
		delete: string;
	}

	constructor(db_sql: Pool) {
		this.db = db_sql;
		this.query = {
			get: 'SELECT id, user_name,tel_number FROM request_call where is_not_processed = true',
			post: 'INSERT INTO request_call(user_name, tel_number, is_not_processed) values($1,$2,true) RETURNING user_name, tel_number ;',
			delete: 'DELETE FROM request_call  where id = $1 RETURNING id;',
		}
	};
	get = async (requestCallId?: URIParamsRequestCallIdModel): Promise<SQLRequestCallModel[]> => {
		try {
			const res: QueryResult<SQLRequestCallModel> =
				await db.query(this.query.get + requestCallId ? ` AND id=${requestCallId}` : `;`);
			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		};

	};

	post = async (data: SQLRequestCallModel): Promise<SQLRequestCallModel[]> => {
		try {
			const res: QueryResult<SQLRequestCallModel> =
				await db.query(this.query.post, [data.user_name, data.tel_number]);
			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		}

	};
	delete = async (requestCallId: URIParamsRequestCallIdModel): Promise<SQLRequestCallIdModel[]> => {
		try {
			const res: QueryResult<SQLRequestCallIdModel> =
				await db.query(this.query.delete, [requestCallId.id]);
			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		}
	};

}

export const requestCallRepository = new RequestCallRepository(db);
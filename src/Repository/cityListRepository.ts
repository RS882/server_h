
import { db } from '../db/db';
import { QueryResult, Pool } from 'pg';

import { SQLCitysListModel } from './../models/SQLModels/SQLCitysListModel';


class CitysListRepository {
	db: Pool;
	query: {
		text: string;
		values: [boolean]
	};

	constructor(db_sql: Pool) {
		this.db = db_sql;
		this.query = {
			text: 'SELECT city_name FROM city where is_aktive = $1',
			values: [true],
		}
	};
	get = async () => {
		try {
			const res: QueryResult<SQLCitysListModel> = await db.query(this.query);
			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		}

	};



}

export const citysListRepository = new CitysListRepository(db);
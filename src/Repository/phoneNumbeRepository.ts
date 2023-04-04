
import { db } from '../db/db';
import { QueryResult, Pool } from 'pg';
import { SQLPhoneNumberMobel } from '../models/SQLModels/SQLPhoneNumberMobel';
import { SQLRequestCallModel } from '../models/SQLModels/SQLRequestCallModel';






class PhoneNumberRepository {
	db: Pool;
	query: {
		text: string;
		values: [boolean]
	}

	constructor(db_sql: Pool) {
		this.db = db_sql;
		this.query = {
			text: 'SELECT id, tel_number FROM tel_number  where is_aktive = $1',
			values: [true],
		}

	};
	get = async () => {
		try {
			const res: QueryResult<SQLPhoneNumberMobel> = await db.query(this.query);


			// const get = {
			// 	text: 'SELECT id, user_name,tel_number FROM request_call where is_not_processed = $1 AND id = 14;',
			// 	values: [true],
			// 	post: 'INSERT INTO request_call(user_name, tel_number, is_not_processed) values($1,$2,true) RETURNING user_name, tel_number ;',
			// 	delete: 'DELETE FROM request_call  where id = $1;',
			// };
			// const res11: QueryResult<SQLRequestCallModel> = await db.query(get.text, get.values);
			// console.log(res11.rows);

			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		}

	};

}

export const phoneNumberRepository = new PhoneNumberRepository(db);
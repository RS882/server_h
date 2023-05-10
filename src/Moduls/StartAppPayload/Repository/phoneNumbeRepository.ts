

import { QueryResult, Pool } from 'pg';

import { db } from '../../../db/db';
import { SQLPhoneNumberMobel } from './../Models/SQLModels/SQLPhoneNumberMobel';
import { log } from 'console';
import { addCityToSql } from '../../../db/addToDb';






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
			const res: QueryResult<SQLPhoneNumberMobel> = await this.db.query(this.query);

			// await addCityToSql();
			// const uuidActivationLink: string = uuidv4();
			// console.log(uuidActivationLink);

			// console.log(env.JWT_REFRESH_SECRET);

			// const get = {
			// 	text: 'SELECT id, user_name,tel_number FROM request_call where is_not_processed = $1 AND id = 14;',
			// 	values: [true],
			// 	post: 'INSERT INTO request_call(user_name, tel_number, is_not_processed) values($1,$2,true) RETURNING user_name, tel_number ;',
			// 	delete: 'DELETE FROM request_call  where id = $1 RETURNING id;',
			// };
			// const res11: QueryResult<SQLRequestCallModel> = await db.query(get.delete, [16]);
			// console.log(res11.rows);

			// const searchEmail: QueryResult<{ exists: boolean }> = await this.db.query(`SELECT EXISTS (SELECT * FROM user_auth WHERE email = $1);`, ['11'])
			// console.log(searchEmail.rows[0].exists);

			// const insertEmail = await this.db.query(`INSERT INTO user_auth(email, pasword) values ('9922','33') RETURNING *;`)
			// console.log(insertEmail.rows[0]);

			return res.rows;
		} catch (e: any) {
			console.log(e);

			// console.log(e.cod ? e.code : '');
			return [];
		}

	};

}

export const phoneNumberRepository = new PhoneNumberRepository(db);


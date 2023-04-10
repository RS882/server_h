
import { db } from '../db/db';
import { QueryResult, Pool } from 'pg';
import { SQLPhoneNumberMobel } from '../models/SQLModels/SQLPhoneNumberMobel';
import { SQLRequestCallModel } from '../models/SQLModels/SQLRequestCallModel';
import { addCityToSql } from '../db/addToDb';







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

// Array(18)
// 0
// :
// "length"
// 1
// :
// "name"
// 2
// :
// "severity"
// 3
// :
// "code"
// 4
// :
// "detail"
// 5
// :
// "hint"
// 6
// :
// "position"
// 7
// :
// "internalPosition"
// 8
// :
// "internalQuery"
// 9
// :
// "where"
// 10
// :
// "schema"
// 11
// :
// "table"
// 12
// :
// "column"
// 13
// :
// "dataType"
// 14
// :
// "constraint"
// 15
// :
// "file"
// 16
// :
// "line"
// 17
// :
// "routine"
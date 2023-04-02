
import { db } from './../db/db_';
import { QueryResult, Pool } from 'pg';
import { SQLPhoneNumberMobel } from './SQLModels/SQLPhoneNumberMobel';





class PhoneNumberRepository {
	db: Pool;
	query: {
		text: string;
		values: [boolean]
	}

	constructor(db_sql: Pool) {
		this.db = db_sql;
		this.query = {
			text: 'SELECT tel_number FROM tel_number  where is_aktive = $1',
			values: [true],
		}
	};
	get = async () => {
		try {

			const res: QueryResult<SQLPhoneNumberMobel> = await db.query(this.query);

			return res.rows;
		} catch (error) {
			console.log(error);
			return [];
		}

	};

}

export const phoneNumberRepository = new PhoneNumberRepository(db);
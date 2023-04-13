"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberRepository = void 0;
const db_1 = require("../db/db");
class PhoneNumberRepository {
    constructor(db_sql) {
        this.get = async () => {
            // try {
            const res = await this.db.query(this.query);
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
            // } catch (e: any) {
            // 	console.log(e);
            // 	// console.log(e.cod ? e.code : '');
            // 	return [];
            // }
        };
        this.db = db_sql;
        this.query = {
            text: 'SELECT id, tel_number FROM tel_number  where is_aktive = $1',
            values: [true],
        };
    }
    ;
}
exports.phoneNumberRepository = new PhoneNumberRepository(db_1.db);
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

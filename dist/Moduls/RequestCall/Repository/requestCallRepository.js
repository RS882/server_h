"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCallRepository = void 0;
const db_1 = require("../../../db/db");
class RequestCallRepository {
    constructor(db_sql) {
        this.get = async (requestCallId) => {
            // try {
            const res = await this.db.query(this.query.get + (requestCallId.id ? ` AND id=${requestCallId.id}` : `;`));
            return res.rows;
            // } catch (error) {
            // 	console.log('get');
            // 	console.log(error);
            // 	return [];
            // };
        };
        this.post = async (data) => {
            // try {
            const res = await this.db.query(this.query.post, [data.user_name, data.tel_number]);
            return res.rows;
            // } catch (error) {
            // 	console.log('post');
            // 	console.log(error);
            // 	return [];
            // }
        };
        this.delete = async (requestCallId) => {
            // try {
            const res = await this.db.query(this.query.delete, [requestCallId.id]);
            return res.rows;
            // } catch (error) {
            // 	console.log('delete');
            // 	console.log(error);
            // 	return [];
            // }
        };
        this.db = db_sql;
        this.query = {
            get: 'SELECT id, user_name, tel_number FROM request_call where is_not_processed = true',
            post: 'INSERT INTO request_call(user_name, tel_number, is_not_processed) values($1,$2,true) RETURNING user_name, tel_number ;',
            delete: 'DELETE FROM request_call  where id = $1 RETURNING id;',
        };
    }
    ;
}
exports.requestCallRepository = new RequestCallRepository(db_1.db);

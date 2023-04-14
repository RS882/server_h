"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citysListRepository = void 0;
const db_1 = require("../../../db/db");
class CitysListRepository {
    constructor(db_sql) {
        this.get = async () => {
            // try {
            const res = await this.db.query(this.query);
            return res.rows;
            // } catch (error) {
            // 	console.log(error);
            // 	return [];
            // }
        };
        this.db = db_sql;
        this.query = {
            text: 'SELECT city_name FROM city where is_aktive = $1',
            values: [true],
        };
    }
    ;
}
exports.citysListRepository = new CitysListRepository(db_1.db);

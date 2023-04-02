"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.db = void 0;
const pg_1 = require("pg");
exports.db = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'rootrs',
    port: 5432,
    database: 'healthshoper',
});
exports.dbQuery = {
    query: (text, params) => exports.db.query(text, params),
};
// UPDATE tel_number set is_aktive = true where id = 1;
// DELETE FROM tel_number  where id = 1;
// SELECT * FROM tel_number  where id = 1;
// SELECT * FROM tel_number;
// INSERT INTO tel_number(tel_number) values (444444444444);
//SELECT tel_number FROM tel_number;

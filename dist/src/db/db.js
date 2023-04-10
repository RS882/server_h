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

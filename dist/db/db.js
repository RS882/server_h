"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.db = void 0;
const pg_1 = require("pg");
const process_1 = require("process");
exports.db = new pg_1.Pool({
    host: process_1.env.PGHOST,
    user: process_1.env.PGUSER,
    password: process_1.env.PGPASSWORD,
    port: +process_1.env.PGPORT,
    database: process_1.env.PGDATABASE,
});
exports.dbQuery = {
    query: (text, params) => exports.db.query(text, params),
};

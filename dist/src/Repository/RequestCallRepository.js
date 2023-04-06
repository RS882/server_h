"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCallRepository = void 0;
const db_1 = require("../db/db");
class RequestCallRepository {
    constructor(db_sql) {
        this.get = (requestCallId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.db.query(this.query.get + (requestCallId.id ? ` AND id=${requestCallId}` : `;`));
                console.log(res.rows);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                return [];
            }
            ;
        });
        this.post = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.db.query(this.query.post, [data.user_name, data.tel_number]);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
        this.delete = (requestCallId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.db.query(this.query.delete, [requestCallId.id]);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
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

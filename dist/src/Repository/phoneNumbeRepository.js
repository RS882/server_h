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
exports.phoneNumberRepository = void 0;
const db_1 = require("./../db/db_");
class PhoneNumberRepository {
    constructor(db_sql) {
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.db.query(this.query);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
        this.db = db_sql;
        this.query = {
            text: 'SELECT tel_number FROM tel_number  where is_aktive = $1',
            values: [true],
        };
    }
    ;
}
exports.phoneNumberRepository = new PhoneNumberRepository(db_1.db);
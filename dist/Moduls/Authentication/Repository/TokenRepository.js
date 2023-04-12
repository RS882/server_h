"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepositoty = void 0;
const db_1 = require("../../../db/db");
class TokenRepositoty {
    constructor(dbSql) {
        this.searchToken = async (user_id) => {
            const isTokenFound = await this.db.query(this.query.searchTokenText, [user_id]);
            return isTokenFound.rows[0].exists;
        };
        this.updateToken = async ({ userId, refreshToken }) => {
            const upToken = await this.db.query(this.query.updateTokeText, [refreshToken, userId]);
            return upToken.rows[0];
        };
        this.createToken = async ({ userId, refreshToken }) => {
            const createToken = await this.db.query(this.query.createToken, [refreshToken, userId]);
            return createToken.rows[0];
        };
        this.db = dbSql;
        this.query = {
            searchTokenText: `SELECT EXISTS (SELECT * FROM token WHERE user_id = $1);`,
            updateTokeText: `UPDATE token set refresh_token = '$1' where user_id  = $2 RETURNING *;`,
            createToken: `INSERT INTO token(refresh_token, user_id) values ('$1',$2) RETURNING *;`,
        };
    }
    ;
}
exports.tokenRepositoty = new TokenRepositoty(db_1.db);

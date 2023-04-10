"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoty = void 0;
const db_1 = require("../../../db/db");
const sqlCode_1 = require("../SQLCode/sqlCode");
class UserRepositoty {
    constructor(dbSql) {
        this.addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }) => {
            try {
                const searchEmail = await this.db.query(this.query.coincidenceEmail, [userEmail, userPassword, activationLink]);
                return searchEmail.rows[0];
            }
            catch (error) {
                if (error.code && error.code === sqlCode_1.SQLCODE.duplicate_key_violates_unique_constraint_23505) {
                    return [`The user with email ${userEmail} has already been registered`,];
                }
                console.log(error);
                return [''];
            }
        };
        this.db = dbSql;
        this.query = {
            coincidenceEmail: `INSERT INTO user_auth(email, pasword, activation_link) values ('$1','$2','$3') RETURNING *;`,
        };
    }
    ;
}
exports.userRepositoty = new UserRepositoty(db_1.db);

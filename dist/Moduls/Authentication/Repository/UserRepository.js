"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoty = void 0;
const db_1 = require("../../../db/db");
class UserRepositoty {
    constructor(dbSql) {
        this.addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }) => {
            const addData = await this.db.query(this.query.insertUserData, [userEmail, userPassword, activationLink]);
            return addData.rows[0];
            // } catch (error: any | unknown) {
            // 	if (error.code && error.code === SQLCODE.duplicate_key_violates_unique_constraint_23505) {
            // 		return [`The user with email ${userEmail} has already been registered`,];
            // 	}
            // 	console.log(error);
            // 	return [''];
            // }
        };
        this.searchUserData = async (userEmail) => {
            const isUserFound = await this.db.query(this.query.searchUserData, [userEmail]);
            return isUserFound.rows[0].exists;
        };
        this.db = dbSql;
        this.query = {
            searchUserData: `SELECT EXISTS (SELECT * FROM user_auth WHERE email = $1);`,
            insertUserData: `INSERT INTO user_auth(email, pasword, activation_link) values ('$1','$2','$3') RETURNING *;`,
        };
    }
    ;
}
exports.userRepositoty = new UserRepositoty(db_1.db);

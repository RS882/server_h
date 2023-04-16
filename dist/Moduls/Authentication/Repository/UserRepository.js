"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoty = void 0;
const db_1 = require("../../../db/db");
class UserRepositoty {
    constructor(dbSql) {
        this.addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }) => {
            // try {
            const addData = await this.db.query(this.query.insertUserData, [userEmail, userPassword, activationLink]);
            return addData.rows[0];
            // } catch (error) {
            // 	console.log('addUserRedDataToSQL');
            // 	console.log(error);
            // }
        };
        this.searchUserData = async (userEmail) => {
            // try {
            const isUserFound = await this.db.query(this.query.searchUserDataText, [userEmail]);
            return isUserFound.rows[0].exists;
            // } catch (error) {
            // 	console.log('searchUserData');
            // 	console.log(error);
            // }
        };
        this.searchAktivationLink = async (aktivationLink) => {
            try {
                const isUserFound = await this.db.query(this.query.searchAktivationLinkText, [aktivationLink]);
                return isUserFound.rows[0].exists;
            }
            catch (error) {
                console.log('searchAktivationLink');
                console.log(error);
            }
        };
        this.setUserActivationTrue = async (aktivationLink) => {
            try {
                const setActivation = await this.db.query(this.query.setActivationTruetext, [aktivationLink]);
            }
            catch (error) {
                console.log('setActivation');
                console.log(error);
            }
        };
        this.db = dbSql;
        this.query = {
            searchUserDataText: `SELECT EXISTS (SELECT * FROM user_auth WHERE email = $1);`,
            insertUserData: `INSERT INTO user_auth(email, pasword, activation_link) values ($1,$2,$3) RETURNING *;`,
            searchAktivationLinkText: `SELECT EXISTS (SELECT * FROM user_auth WHERE activation_link = $1) ;`,
            setActivationTruetext: `UPDATE user_auth SET is_activated = true WHERE activation_link = $1;`,
        };
    }
    ;
}
exports.userRepositoty = new UserRepositoty(db_1.db);

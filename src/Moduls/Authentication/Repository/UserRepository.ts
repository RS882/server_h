import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { UserAuthModel } from "../Models/UserAuthModel";
import { UserRegMessageModel } from "../Models/UserRegMessageModel";
import { SQLCODE } from "../SQLCode/sqlCode";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";


class UserRepositoty {
	db: Pool;
	query: {
		insertUserData: string;
		searchUserData: string;
	}
	constructor(dbSql: Pool) {
		this.db = dbSql;
		this.query = {
			searchUserData: `SELECT EXISTS (SELECT * FROM user_auth WHERE email = $1);`,
			insertUserData: `INSERT INTO user_auth(email, pasword, activation_link) values ($1,$2,$3) RETURNING *;`,
		}
	};

	addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }: UserAuthModel): Promise<SQLUserAuthModel> => {
		// try {
		const addData: QueryResult<SQLUserAuthModel> = await this.db.query(this.query.insertUserData, [userEmail, userPassword, activationLink]);
		return addData.rows[0];
		// } catch (error) {
		// 	console.log('addUserRedDataToSQL');

		// 	console.log(error);
		// }



	};
	searchUserData = async (userEmail: string): Promise<boolean > => {
		// try {
			const isUserFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchUserData, [userEmail]);
			return isUserFound.rows[0].exists;
		// } catch (error) {
		// 	console.log('searchUserData');

		// 	console.log(error);
		// }

	};

}

export const userRepositoty = new UserRepositoty(db);



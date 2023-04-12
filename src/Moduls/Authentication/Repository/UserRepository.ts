import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { UserAuthModel } from "../Models/UserAuthModel";
import { UserRegMessageModel } from "../Models/UserRegMessageModel";
import { SQLCODE } from "../SQLCode/sqlCode";

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
			insertUserData: `INSERT INTO user_auth(email, pasword, activation_link) values ('$1','$2','$3') RETURNING *;`,
		}
	};

	addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }: UserAuthModel): Promise<UserAuthModel> => {

		const addData: QueryResult<UserAuthModel> = await this.db.query(this.query.insertUserData, [userEmail, userPassword, activationLink]);
		return addData.rows[0];
		// } catch (error: any | unknown) {
		// 	if (error.code && error.code === SQLCODE.duplicate_key_violates_unique_constraint_23505) {
		// 		return [`The user with email ${userEmail} has already been registered`,];
		// 	}
		// 	console.log(error);
		// 	return [''];
		// }

	};
	searchUserData = async (userEmail: string): Promise<boolean> => {
		const isUserFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchUserData, [userEmail]);
		return isUserFound.rows[0].exists;
	};

}

export const userRepositoty = new UserRepositoty(db);



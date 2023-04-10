import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { UserAuthModel } from "../Models/UserAuthModel";
import { UserRegMessageModel } from "../Models/ErrorMessageModel";
import { SQLCODE } from "../SQLCode/sqlCode";

class UserRepositoty {
	db: Pool;
	query: {
		coincidenceEmail: string;
	}
	constructor(dbSql: Pool) {
		this.db = dbSql;
		this.query = {
			coincidenceEmail: `INSERT INTO user_auth(email, pasword, activation_link) values ('$1','$2','$3') RETURNING *;`,
		}
	};

	addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }: UserAuthModel): Promise<UserAuthModel | UserRegMessageModel> => {
		try {
			const searchEmail: QueryResult<UserAuthModel> = await this.db.query(this.query.coincidenceEmail, [userEmail, userPassword, activationLink]);
			return searchEmail.rows[0];
		} catch (error: any | unknown) {
			if (error.code && error.code === SQLCODE.duplicate_key_violates_unique_constraint_23505) {
				return [`The user with email ${userEmail} has already been registered`,];
			}
			console.log(error);
			return [''];
		}

	}

}

export const userRepositoty = new UserRepositoty(db);



import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";

import { UserRegMessageModel } from "../Models/UserRegMessageModel";

import { TokenModel } from "../Models/TokenModel";
import { log } from "console";
import { SQLTokenModel } from "../Models/SQLModels/SQLTokenModel";

class TokenRepositoty {
	db: Pool;
	query: {
		searchTokenText: string;
		updateTokeText: string;
		createToken: string;

	}
	constructor(dbSql: Pool) {
		this.db = dbSql;
		this.query = {
			searchTokenText: `SELECT EXISTS (SELECT * FROM token WHERE user_id = $1);`,
			updateTokeText: `UPDATE token set refresh_token = $1 where user_id  = $2 RETURNING *;`,
			createToken: `INSERT INTO token(refresh_token, user_id) values ($1, $2) RETURNING *;`,

		}
	};

	searchToken = async (user_id: number): Promise<boolean> => {
		// try {
		const isTokenFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchTokenText, [user_id]);
		return isTokenFound.rows[0].exists;
		// } catch (error) {
		// 	console.log('searchToken');
		// 	console.log(error);

		// }


	};

	updateToken = async ({ userId, refreshToken }: TokenModel): Promise<SQLTokenModel> => {
		// try {
		const upToken: QueryResult<SQLTokenModel> = await this.db.query(this.query.updateTokeText, [refreshToken, userId]);
		return upToken.rows[0];
		// } catch (error) {
		// 	console.log('updateToken');
		// 	console.log(error);
		// }


	};
	createToken = async ({ userId, refreshToken }: TokenModel): Promise<SQLTokenModel> => {
		// try {
		const createToken: QueryResult<SQLTokenModel> = await this.db.query(this.query.createToken, [refreshToken, userId]);
		return createToken.rows[0];

		// } catch (error) {
		// 	console.log('createToken');
		// 	console.log(error);
		// }

	};
}

export const tokenRepositoty = new TokenRepositoty(db);



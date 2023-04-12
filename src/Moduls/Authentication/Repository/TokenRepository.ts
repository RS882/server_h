import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";

import { UserRegMessageModel } from "../Models/UserRegMessageModel";

import { TokenModel } from "../Models/TokenModel";

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
			updateTokeText: `UPDATE token set refresh_token = '$1' where user_id  = $2 RETURNING *;`,
			createToken: `INSERT INTO token(refresh_token, user_id) values ('$1',$2) RETURNING *;`,

		}
	};

	searchToken = async (user_id: number): Promise<boolean> => {

		const isTokenFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchTokenText, [user_id]);
		return isTokenFound.rows[0].exists;

	};

	updateToken = async ({ userId, refreshToken }: TokenModel): Promise<TokenModel> => {

		const upToken: QueryResult<TokenModel> = await this.db.query(this.query.updateTokeText, [refreshToken, userId]);
		return upToken.rows[0];

	};
	createToken = async ({ userId, refreshToken }: TokenModel): Promise<TokenModel> => {

		const createToken: QueryResult<TokenModel> = await this.db.query(this.query.createToken, [refreshToken, userId]);
		return createToken.rows[0];

	};
}

export const tokenRepositoty = new TokenRepositoty(db);



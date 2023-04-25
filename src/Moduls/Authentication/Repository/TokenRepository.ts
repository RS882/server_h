import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { SQLTokenModel } from "../Models/SQLModels/SQLTokenModel";
import { ITokenRepositoty, updateOrCreateTokenType } from "./TokenRespository";
import { SQLQuerys } from "../../../PosgresqlQuery/querys";
import { fieldsNameOfTokenTable } from "../DBFildsName/tokenTable";



class TokenRepositoty extends SQLQuerys {
	db: Pool;
	dbFieldsName: typeof fieldsNameOfTokenTable;

	constructor(dbSql: Pool, dbName: typeof fieldsNameOfTokenTable) {
		super(`token`);
		this.db = dbSql;
		this.dbFieldsName = dbName;
	};

	#searchByField = async <T>(nameOfField: string, fieldValue: T): Promise<boolean> => {
		const isTokenFound: QueryResult<{ exists: boolean }> =
			await this.db.query(this.foundDataByElement(nameOfField), [fieldValue]);
		return isTokenFound.rows[0].exists;
	};


	searchToken = async (id: number): Promise<boolean> =>
		await this.#searchByField(this.dbFieldsName.USER_ID, id);


	searchTokenWithRefreshToken = async (token: string): Promise<boolean> =>
		await this.#searchByField(this.dbFieldsName.REFRESH_TOKEN, token);


	updateToken: updateOrCreateTokenType = async (userId, refreshToken) => {
		const names = this.dbFieldsName;
		const upToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.updateDataByElement(names.REFRESH_TOKEN, names.USER_ID, true), [refreshToken, userId]);
		return upToken.rows[0];
	};
	createToken: updateOrCreateTokenType = async (userId, refreshToken) => {
		const names = this.dbFieldsName;
		const createToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.addData([names.REFRESH_TOKEN, names.USER_ID]), [refreshToken, userId]);
		return createToken.rows[0];
	};

	deleteToken = async (refreshToken: string): Promise<SQLTokenModel> => {

		const fieldName = this.dbFieldsName.REFRESH_TOKEN;
		const getDeletedToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.selectDataByElement(fieldName), [refreshToken]);

		const deleteToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.deleteData(fieldName), [refreshToken]);

		return getDeletedToken.rows[0];
	};

}

export const tokenRepositoty = new TokenRepositoty(db, fieldsNameOfTokenTable);



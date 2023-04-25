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


	searchToken = async (field: number): Promise<boolean> => {
		const fieldName = this.dbFieldsName.USER_ID;
		// try {
		return await this.#searchByField(fieldName, field);

		// } catch (error) {
		// 	console.log('searchToken');
		// 	console.log(error);

		// }


	};

	searchTokenWithRefreshToken = async (field: string): Promise<boolean> => {
		const fieldName = this.dbFieldsName.REFRESH_TOKEN;
		// try {
		return await this.#searchByField(fieldName, field);

		// } catch (error) {
		// 	console.log('searchToken');
		// 	console.log(error);

		// }


	};

	updateToken: updateOrCreateTokenType = async (userId, refreshToken) => {
		const names = this.dbFieldsName;
		// try {
		const upToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.updateDataByElement(names.REFRESH_TOKEN, names.USER_ID, true), [refreshToken, userId]);
		return upToken.rows[0];
		// } catch (error) {
		// 	console.log('updateToken');
		// 	console.log(error);
		// }


	};
	createToken: updateOrCreateTokenType = async (userId, refreshToken) => {
		const names = this.dbFieldsName;
		// try {
		const createToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.addData([names.REFRESH_TOKEN, names.USER_ID]), [refreshToken, userId]);
		return createToken.rows[0];

		// } catch (error) {
		// 	console.log('createToken');
		// 	console.log(error);
		// }

	};

	deleteToken = async (refreshToken: string): Promise<SQLTokenModel> => {
		const fieldName = this.dbFieldsName.REFRESH_TOKEN;
		// try {
		const getDeletedToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.selectDataByElement(fieldName), [refreshToken]);

		const deleteToken: QueryResult<SQLTokenModel> =
			await this.db.query(this.deleteData(fieldName), [refreshToken]);

		return getDeletedToken.rows[0];

		// } catch (error) {
		// 	console.log('deleteToken');
		// 	console.log(error);
		// }

	};

}

export const tokenRepositoty = new TokenRepositoty(db, fieldsNameOfTokenTable);



import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { UserAuthModel } from "../Models/UserAuthModel";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";
import { SQLQuerys } from "../../../PosgresqlQuery/querys";

import { fieldsNameOfUserAuthTable } from "../DBFildsName/user_auth";
import { env } from "process";


class UserRepositoty extends SQLQuerys {
	db: Pool;
	dbFieldsName: typeof fieldsNameOfUserAuthTable;

	constructor(dbSql: Pool, dbName: typeof fieldsNameOfUserAuthTable) {
		super(env.USER_AUTH_DB_NAME!);
		this.db = dbSql;
		this.dbFieldsName = dbName;
	};

	#searchByField = async <T>(nameOfField: string, fieldValue: T): Promise<boolean> => {
		const isTokenFound: QueryResult<{ exists: boolean }> =
			await this.db.query(this.foundDataByElement(nameOfField), [fieldValue]);
		return isTokenFound.rows[0].exists;
	};

	#getDataByField = async <T>(nameOfField: string, fieldValue: T): Promise<SQLUserAuthModel> => {
		const getData: QueryResult<SQLUserAuthModel> =
			await this.db.query(this.selectDataByElement(nameOfField), [fieldValue]);
		return getData.rows[0];
	};

	addUserRedDataToSQL = async ({ userEmail, userPassword, activationLink }: UserAuthModel): Promise<SQLUserAuthModel> => {
		const arrNames = [this.dbFieldsName.EMAIL, this.dbFieldsName.PASSWORD, this.dbFieldsName.ACTIVATION_LINK];
		const addData: QueryResult<SQLUserAuthModel> =
			await this.db.query(this.addData(arrNames), [userEmail, userPassword, activationLink]);
		return addData.rows[0];
	};
	searchUserData = async (userEmail: string): Promise<boolean> =>
		await this.#searchByField(this.dbFieldsName.EMAIL, userEmail);

	searchAktivationLink = async (aktivationLink: string): Promise<boolean> =>
		await this.#searchByField(this.dbFieldsName.ACTIVATION_LINK, aktivationLink);

	setUserActivationTrue = async (aktivationLink: string): Promise<void> => {
		const setActivation =
			await this.db.query(this.updateDataByElement(this.dbFieldsName.IS_ACTIVATED, this.dbFieldsName.ACTIVATION_LINK), [true, aktivationLink]);
	};

	getUserData = async (userEmail: string): Promise<SQLUserAuthModel> =>
		await this.#getDataByField(this.dbFieldsName.EMAIL, userEmail);

	getUserDataById = async (id: number): Promise<SQLUserAuthModel> =>
		await this.#getDataByField(this.dbFieldsName.ID, id);

	getAllUsers = async (): Promise<SQLUserAuthModel[]> => {
		const getData: QueryResult<SQLUserAuthModel> = await this.db.query(this.selectDataByElement());
		return getData.rows;
	};

}

export const userRepositoty = new UserRepositoty(db, fieldsNameOfUserAuthTable);



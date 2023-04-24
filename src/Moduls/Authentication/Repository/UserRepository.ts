import { Pool, QueryResult } from "pg";
import { db } from "../../../db/db";
import { UserAuthModel } from "../Models/UserAuthModel";

import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";


class UserRepositoty {
	db: Pool;
	query: {
		insertUserData: string;
		searchUserDataText: string;
		searchAktivationLinkText: string;
		setActivationTruetext: string;
		getUserDataText: string;
		getUserDataByIdText: string;
		getAllUsersText: string;
	}
	constructor(dbSql: Pool) {
		this.db = dbSql;
		this.query = {
			searchUserDataText: `SELECT EXISTS (SELECT * FROM user_auth WHERE email = $1);`,
			insertUserData: `INSERT INTO user_auth(email, pasword, activation_link) values ($1,$2,$3) RETURNING *;`,
			searchAktivationLinkText: `SELECT EXISTS (SELECT * FROM user_auth WHERE activation_link = $1) ;`,
			setActivationTruetext: `UPDATE user_auth SET is_activated = true WHERE activation_link = $1;`,
			getUserDataText: `SELECT * FROM user_auth WHERE email = $1`,
			getUserDataByIdText: `SELECT * FROM user_auth WHERE id = $1`,
			getAllUsersText: `SELECT * FROM user_auth ;`
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
	searchUserData = async (userEmail: string): Promise<boolean> => {
		// try {
		const isUserFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchUserDataText, [userEmail]);
		return isUserFound.rows[0].exists;
		// } catch (error) {
		// 	console.log('searchUserData');

		// 	console.log(error);
		// }

	};

	searchAktivationLink = async (aktivationLink: string): Promise<boolean> => {

		// try {

		const isUserFound: QueryResult<{ exists: boolean }> = await this.db.query(this.query.searchAktivationLinkText, [aktivationLink]);
		return isUserFound.rows[0].exists;
		// } catch (error) {
		// 	console.log('searchAktivationLink');

		// 	console.log(error);
		// }


	};

	setUserActivationTrue = async (aktivationLink: string): Promise<void> => {
		// try {
		const setActivation = await this.db.query(this.query.setActivationTruetext, [aktivationLink]);

		// } catch (error) {
		// 	console.log('setActivation');

		// 	console.log(error);
		// }
	};

	getUserData = async (userEmail: string): Promise<SQLUserAuthModel> => {
		// try {
		const getData: QueryResult<SQLUserAuthModel> = await this.db.query(this.query.getUserDataText, [userEmail]);
		return getData.rows[0];
		// } catch (error) {
		// 	console.log('addUserRedDataToSQL');

		// 	console.log(error);
		// }
	};
	getUserDataById = async (id: number): Promise<SQLUserAuthModel> => {
		// try {
		const getData: QueryResult<SQLUserAuthModel> = await this.db.query(this.query.getUserDataByIdText, [id]);
		return getData.rows[0];
		// } catch (error) {
		// 	console.log('getUserDataById');

		// 	console.log(error);
		// }
	};
	getAllUsers = async (): Promise<SQLUserAuthModel[]> => {
		// try {
		const getData: QueryResult<SQLUserAuthModel> = await this.db.query(this.query.getAllUsersText);
		return getData.rows;
		// } catch (error) {
		// 	console.log('getUserDataById');

		// 	console.log(error);
		// }
	};


}

export const userRepositoty = new UserRepositoty(db);



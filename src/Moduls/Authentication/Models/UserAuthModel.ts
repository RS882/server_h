import { APIUserLoginModel } from "./APIUserLoginModel";

export interface UserAuthModel extends APIUserLoginModel {
	/**
	 *user ID  in the database
	 */
	userId?: number;

	/**
	 * confirmed user  mail or not
	 */
	isActivated?: boolean;
	/**
	 * Email activation link
	 */
	activationLink?: string;
};


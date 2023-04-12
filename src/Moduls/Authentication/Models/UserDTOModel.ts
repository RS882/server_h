export interface UserDTOModel {
	/**
	 * user id
	 */
	id: number;
	/**
	 * user email
	 */
	email: string;
	/**
	 * confirmed user  mail or not
	 */
	isActivate: boolean;
}
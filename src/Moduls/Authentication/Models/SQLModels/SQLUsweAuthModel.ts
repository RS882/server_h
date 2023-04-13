export interface SQLUserAuthModel {
	/**
 *user ID  in the database
 */
	id: number;
	/**
 * users email -unique
 */
	email: string;
	/**
 * usres password -hash
 */
	pasword: string;
	/**
	 * confirmed user  mail or not
	 */
	is_activated: boolean;
	/**
 * Email activation link
 */
	activation_link: string;

};


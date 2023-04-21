export interface SQLTokenModel {
	/**
	 *  Record number in the database
	 */
	id: number;
	/**
*user ID  in the database
*/
	user_id: number;
	/**
	 * refresh token
	 */
	refresh_token: string;
	/**
	 * users IP adress
	 */
	user_ip_aderss: string;

}


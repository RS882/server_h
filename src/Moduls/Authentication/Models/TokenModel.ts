export interface TokenModel {
	/**
	 *  Record number in the database
	 */
	id?: number;
	/**
*user ID  in the database
*/
	userId: number;
	/**
	 * refresh token
	 */
	refreshToken: string;
	/**
	 * users IP adress
	 */
	userIPAdress?: string;

}
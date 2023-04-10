export interface TokenModel {
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
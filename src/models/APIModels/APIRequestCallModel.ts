export interface APIRequestCallModel {
	/**
	 *Request call ID translated in response
	 */
	id?: number;
	/**
	 * Name of user which order is a call
	 */
	userName: string;
	/**
	 * Phone number which you need to call
	 */
	phoneNumber: string;
}
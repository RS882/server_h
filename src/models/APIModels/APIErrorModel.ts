export interface APIErrorModel {
	/**
	 *  http  error code
	 */
	status: number;
	/**
	 * object Error
	 */
	errors: Error[];
}
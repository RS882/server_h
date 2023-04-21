import { SQLTokenModel } from '../Models/SQLModels/SQLTokenModel';
import { TokenModel } from '../Models/TokenModel';


export class TokenDTO implements TokenModel {

	id;
	userId;
	refreshToken;
	userIPAdress;

	constructor(model: SQLTokenModel) {
		this.id = model.id;
		this.userId = model.user_id;
		this.refreshToken = model.refresh_token;
		this.userIPAdress = model.user_ip_aderss;
	}




};


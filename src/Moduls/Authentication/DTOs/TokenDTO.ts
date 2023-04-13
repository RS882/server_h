import { SQLTokenModel } from '../Models/SQLModels/SQLTokenModel';
import { TokenModel } from '../Models/TokenModel';


export class TokenDTO implements TokenModel {

	id;
	userId;
	refreshToken;
	userIPAdress;

	constructor(model: SQLTokenModel) {
		this.id = model.id;
		this.userId = model.userId;
		this.refreshToken = model.refreshToken;
		this.userIPAdress = model.userIPAdress;
	}




};


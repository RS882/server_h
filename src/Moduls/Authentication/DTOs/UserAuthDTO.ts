import { SQLUserAuthModel } from '../Models/SQLModels/SQLUsweAuthModel';
import { UserAuthModel } from '../Models/UserAuthModel';


export class UserAuthDTO implements UserAuthModel {
	userId;
	userEmail;
	userPassword;
	isActivated;
	activationLink;

	constructor(model: SQLUserAuthModel) {
		this.userId = model.id;
		this.userEmail = model.email;
		this.userPassword = model.pasword;
		this.isActivated = model.is_activated;
		this.activationLink = model.activation_link;

	}




};


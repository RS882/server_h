import { UserAuthModel } from '../Models/UserAuthModel';
import { UserDTOModel } from '../Models/UserDTOModel';

export class UserDTO implements UserDTOModel {
	id;
	email;
	isActivate;
	constructor(model: UserAuthModel) {
		this.id = model.userId!;
		this.email = model.userEmail;
		this.isActivate = model.isActivated!;
	}
};


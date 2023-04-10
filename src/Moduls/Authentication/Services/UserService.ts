import { UserRegMessageModel } from "../Models/ErrorMessageModel";
import { UserAuthModel } from "../Models/UserAuthModel";
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import uuid from "uuid";

class UserService {

	reg = async (userRedData: UserAuthModel): Promise<UserRegMessageModel> => {

		try {
			const hashPass: string = await bcrypt.hash(userRedData.userPassword, 3);// хешируем пароль для хранения в базе
			const uuidActivationLink: string = await uuid.v4();// генерируем строку для активации емейла
			const regUser: UserAuthModel | UserRegMessageModel =
				await userRepositoty.addUserRedDataToSQL({
					...userRedData,
					userPassword: hashPass,
					activationLink: uuidActivationLink
				});
			if (Array.isArray(regUser)) return regUser;
			return [];
		} catch (error) {
			console.log(error);
			return [''];
		}
	};


}

export const userService = new UserService();
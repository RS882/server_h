import { UserRegMessageModel } from "../Models/UserRegMessageModel";
import { UserAuthModel } from "../Models/UserAuthModel";
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import uuid from "uuid";
import { mailService } from "./MailService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../DTOs/UserDTO";
import { UserDTOModel } from "../Models/UserDTOModel";
import { UserRegModel } from "../Models/UserRegModel";
import { APIUserLoginModel } from "../Models/APIUserLoginModel";
import { TokenGenerateModel } from "../Models/TokenGenerateModel";


class UserService {

	reg = async (userRedData: APIUserLoginModel): Promise<UserRegModel> => {

		const isUserFound = await userRepositoty.searchUserData(userRedData.userEmail);
		if (isUserFound) throw new Error(`The user with email ${userRedData.userEmail} has already been registered`);

		const hashPass: string = await bcrypt.hash(userRedData.userPassword, 3);// хешируем пароль для хранения в базе
		const uuidActivationLink: string = uuid.v4();// генерируем строку для активации емейла

		const regUser: UserAuthModel = await userRepositoty.addUserRedDataToSQL({
			...userRedData,
			userPassword: hashPass,
			activationLink: uuidActivationLink,
		});


		await mailService.sendActivationLink(regUser.userEmail, uuidActivationLink);

		const userDTO = new UserDTO(regUser);

		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })

		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };


	};


}

export const userService = new UserService();
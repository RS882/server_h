
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { mailService } from "./MailService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../DTOs/UserDTO";

import { APIUserRegModel } from "../Models/APIModels/APIUserRegModel";
import { APIUserLoginModel } from "../Models/APIModels/APIUserLoginModel";
import { TokenGenerateModel } from "../Models/TokenGenerateModel";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";
import { UserAuthDTO } from "../DTOs/UserAuthDTO";
import { errorMessage } from "../../../ErrorMessage/errorMessage";




class UserService {

	reg = async (userRedData: APIUserLoginModel): Promise<APIUserRegModel> => {

		const isUserFound = await userRepositoty.searchUserData(userRedData.userEmail);
		if (isUserFound!) throw new Error(
			errorMessage.REPETITION_EMAIL[0] + ` ${userRedData.userEmail} ` + errorMessage.REPETITION_EMAIL[1]);

		const hashPass: string = await bcrypt.hash(userRedData.userPassword, 3);// хешируем пароль для хранения в базе
		const uuidActivationLink: string = uuidv4();// генерируем строку для активации емейла

		const regUserSQL: SQLUserAuthModel = await userRepositoty.addUserRedDataToSQL({
			...userRedData,
			userPassword: hashPass,
			activationLink: uuidActivationLink,
		});
		const regUser = new UserAuthDTO(regUserSQL);


		const sendMail = await mailService.sendActivationLink(regUser.userEmail, uuidActivationLink);

		const userDTO = new UserDTO(regUser);

		// const tt: UserAuthModel = { userEmail: '11', userId: 11, isActivated: true, userPassword: '11' }
		// const dto2 = new UserDTO(tt)


		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })

		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };


	};


}

export const userService = new UserService();
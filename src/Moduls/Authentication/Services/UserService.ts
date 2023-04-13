import { UserRegMessageModel } from "../Models/UserRegMessageModel";
import { UserAuthModel } from "../Models/UserAuthModel";
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { mailService } from "./MailService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../DTOs/UserDTO";
import { UserDTOModel } from "../Models/UserDTOModel";
import { UserRegModel } from "../Models/UserRegModel";
import { APIUserLoginModel } from "../Models/APIUserLoginModel";
import { TokenGenerateModel } from "../Models/TokenGenerateModel";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";
import { UserAuthDTO } from "../DTOs/UserAuthDTO";




class UserService {

	reg = async (userRedData: APIUserLoginModel): Promise<UserRegModel> => {

		const isUserFound = await userRepositoty.searchUserData(userRedData.userEmail);
		if (isUserFound!) throw new Error(`The user with email ${userRedData.userEmail} has already been registered`);

		const hashPass: string = await bcrypt.hash(userRedData.userPassword, 3);// хешируем пароль для хранения в базе
		const uuidActivationLink: string = uuidv4();// генерируем строку для активации емейла

		const regUserSQL: SQLUserAuthModel = await userRepositoty.addUserRedDataToSQL({
			...userRedData,
			userPassword: hashPass,
			activationLink: uuidActivationLink,
		});
		const regUser = new UserAuthDTO(regUserSQL);


		const sendMail = await mailService.sendActivationLink(regUser.userEmail, uuidActivationLink);
		// console.log(regUser);
		const userDTO = new UserDTO(regUser);

		// const tt: UserAuthModel = { userEmail: '11', userId: 11, isActivated: true, userPassword: '11' }
		// const dto2 = new UserDTO(tt)



		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })

		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };


	};


}

export const userService = new UserService();
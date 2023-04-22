
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { mailService } from "./MailService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../DTOs/UserDTO";
import { env } from 'process';
import { APIUserModel } from "../Models/APIModels/APIUserRegModel";
import { APIUserLoginModel } from "../Models/APIModels/APIUserLoginModel";
import { TokenGenerateModel } from "../Models/TokenGenerateModel";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";
import { UserAuthDTO } from "../DTOs/UserAuthDTO";
import { errorMessage } from "../../../ErrorMessage/errorMessage";
import { APIError } from "../../../Exceptions/APIError";
import { log } from "console";
import { TokenModel } from "../Models/TokenModel";
import { tokenRepositoty } from "../Repository/TokenRepository";





class UserService {

	reg = async (userRedData: APIUserLoginModel): Promise<APIUserModel> => {

		const isUserFound = await userRepositoty.searchUserData(userRedData.userEmail);

		if (isUserFound) throw APIError.BadRequest(
			errorMessage.REPETITION_EMAIL[0] + ` ${userRedData.userEmail} ` + errorMessage.REPETITION_EMAIL[1]);

		const hashPass: string = await bcrypt.hash(userRedData.userPassword, 3);// хешируем пароль для хранения в базе
		const uuidActivationLink: string = uuidv4();// генерируем строку для активации емейла

		const regUserSQL: SQLUserAuthModel = await userRepositoty.addUserRedDataToSQL({
			...userRedData,
			userPassword: hashPass,
			activationLink: uuidActivationLink,
		});
		const regUser = new UserAuthDTO(regUserSQL);
		const userDTO = new UserDTO(regUser);
		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })
		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		//const sendMail = await mailService.sendActivationLink(regUser.userEmail,
		//	`${env.API_URL}/auth/activate/${uuidActivationLink}`);


		return { ...tokens, user: userDTO };


	};

	aktivate = async (activationLink: string) => {
		// try {
		const isActivationLinkFound = await userRepositoty.searchAktivationLink(activationLink);
		if (!isActivationLinkFound) throw APIError.BadRequest(errorMessage.INCORRECT_ACTIVATION_LINK);
		const setAtivation = await userRepositoty.setUserActivationTrue(activationLink);
		// } catch (error) {
		// 	console.log(error);

		// }

	};

	login = async (logData: APIUserLoginModel): Promise<APIUserModel> => {

		const isUserFound: boolean = await userRepositoty.searchUserData(logData.userEmail);
		if (!isUserFound) throw APIError.BadRequest(errorMessage.USER_NOT_FOUND);

		const userData: SQLUserAuthModel = await userRepositoty.getUserData(logData.userEmail);

		const isPasswordEquil: boolean = await bcrypt.compare(logData.userPassword, userData.pasword);
		if (!isPasswordEquil) throw APIError.BadRequest(errorMessage.INCORRECT_PASSWORD);

		const regUser = new UserAuthDTO(userData);
		const userDTO = new UserDTO(regUser);
		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })
		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };
	};

	logout = async (refreshToken: string): Promise<TokenModel> => {
		const token: TokenModel = await tokenService.removeToken(refreshToken);
		return token;
	};

	refresh = async (refreshToken: string): Promise<APIUserModel> => {


		if (!refreshToken) throw APIError.UnauthorizedError();

		const userDataAfterValidation = tokenService.validationRefreshToken(refreshToken);
		if (!userDataAfterValidation) throw APIError.UnauthorizedError();

		const isTokenFoundSuccess: boolean = await tokenRepositoty.searchTokenWithRefreshToken(refreshToken);
		if (!isTokenFoundSuccess) throw APIError.UnauthorizedError();

		const userData: SQLUserAuthModel =
			await userRepositoty.getUserDataById(userDataAfterValidation);

		const regUser = new UserAuthDTO(userData);
		const userDTO = new UserDTO(regUser);
		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })
		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return { ...tokens, user: userDTO };
	}


}

export const userService = new UserService();
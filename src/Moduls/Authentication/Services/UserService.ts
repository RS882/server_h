
import { userRepositoty } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { mailService } from "./MailService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../DTOs/UserDTO";
import { env } from 'process';
import { APIUserModel } from "../Models/APIModels/APIUserRegModel";

import { TokenGenerateModel } from "../Models/TokenGenerateModel";
import { SQLUserAuthModel } from "../Models/SQLModels/SQLUsweAuthModel";
import { UserAuthDTO } from "../DTOs/UserAuthDTO";
import { errorMessage } from "../../../ErrorMessage/errorMessage";
import { APIError } from "../../../Exceptions/APIError";

import { TokenModel } from "../Models/TokenModel";

import { UserDTOModel } from './../Models/UserDTOModel';
import { AktivateType, GetAllUsersType, IUserService, LogoutType, RefreshType, regOrLogServiceMethod } from './UserService.d';




class UserService implements IUserService {

	#getAPIUserModel = async (SQLdata: SQLUserAuthModel, activationLink?: string, isNeedToSendMail = false): Promise<APIUserModel> => {
		const userData = new UserAuthDTO(SQLdata);
		const userDTO = new UserDTO(userData);
		const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })
		const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		if (isNeedToSendMail) await mailService.sendActivationLink({
			to: userData.userEmail,
			link: `${env.API_URL}/auth/activate/${activationLink}`
		});
		return { ...tokens, user: userDTO };
	};

	reg: regOrLogServiceMethod = async (userRedData) => {

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

		// const regUser = new UserAuthDTO(regUserSQL);
		// const userDTO = new UserDTO(regUser);
		// const tokens: TokenGenerateModel = tokenService.generateTokens({ ...userDTO })
		// const saveRefreshToken = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		// const sendMail = await mailService.sendActivationLink({
		// 	to: regUser.userEmail,
		// 	link: `${env.API_URL}/auth/activate/${uuidActivationLink}`
		// });


		return await this.#getAPIUserModel(regUserSQL, uuidActivationLink
			// , true
		);


	};

	aktivate: AktivateType = async (activationLink) => {
		// try {
		const isActivationLinkFound = await userRepositoty.searchAktivationLink(activationLink);
		if (!isActivationLinkFound) throw APIError.BadRequest(errorMessage.INCORRECT_ACTIVATION_LINK);
		const setAtivation = await userRepositoty.setUserActivationTrue(activationLink);
		// } catch (error) {
		// 	console.log(error);

		// }

	};

	login: regOrLogServiceMethod = async (logData) => {

		const isUserFound: boolean = await userRepositoty.searchUserData(logData.userEmail);
		if (!isUserFound) throw APIError.BadRequest(errorMessage.USER_NOT_FOUND);

		const userData: SQLUserAuthModel = await userRepositoty.getUserData(logData.userEmail);

		const isPasswordEquil: boolean = await bcrypt.compare(logData.userPassword, userData.pasword);
		if (!isPasswordEquil) throw APIError.BadRequest(errorMessage.INCORRECT_PASSWORD);

		return await this.#getAPIUserModel(userData);
	};

	logout: LogoutType = async (refreshToken) => {
		return await tokenService.removeToken(refreshToken);
	};

	refresh: RefreshType = async (refreshToken) => {

		if (!refreshToken) throw APIError.UnauthorizedError();

		const userDataAfterValidation = tokenService.validationRefreshToken(refreshToken);
		if (!userDataAfterValidation) throw APIError.UnauthorizedError();

		const isTokenFoundSuccess: boolean = await tokenService.searchToken(refreshToken);
		if (!isTokenFoundSuccess) throw APIError.UnauthorizedError();

		const userData: SQLUserAuthModel =
			await userRepositoty.getUserDataById(userDataAfterValidation);


		return await this.#getAPIUserModel(userData);
	};


	getAllUsers: GetAllUsersType = async () => {

		const allUsers: SQLUserAuthModel[] = await userRepositoty.getAllUsers();
		const allUsersData: UserDTOModel[] = allUsers.map(e => new UserAuthDTO(e))
			.map(e => new UserDTO(e));
		return allUsersData;

	};

};

export const userService = new UserService();
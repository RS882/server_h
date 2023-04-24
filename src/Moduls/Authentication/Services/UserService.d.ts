
import { APIUserLoginModel } from './../Models/APIModels/APIUserLoginModel';
import { APIUserModel } from './../Models/APIModels/APIUserRegModel';

export type regOrLogServiceMethod = (data: APIUserLoginModel) => Promise<APIUserModel>;
export type AktivateType = (activationLink: string) => Promise<void>;
export type LogoutType = (refreshToken: string) => Promise<TokenModel>;
export type RefreshType = (refreshToken: string) => Promise<APIUserModel>;
export type GetAllUsersType = () => Promise<UserDTOModel[]>;

export interface IUserService {
	reg: regOrLogServiceMethod
	aktivate: AktivateType;
	login: regOrLogServiceMethod
	logout: LogoutType;
	refresh: RefreshType;
	getAllUsers: GetAllUsersType;
};
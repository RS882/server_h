import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TokenGenerateModel } from '../Models/TokenGenerateModel';
import { TokenModel } from '../Models/TokenModel';

import { tokenRepositoty } from '../Repository/TokenRepository';

import { UserDTOModel } from '../Models/UserDTOModel';
import { SQLTokenModel } from '../Models/SQLModels/SQLTokenModel';
import { TokenDTO } from '../DTOs/TokenDTO';
import { JwtPayload } from 'jsonwebtoken';



class TokenService {

	generateTokens = (payload: UserDTOModel): TokenGenerateModel => {
		const date = new Date();
		const accessToken: string = jwt.sign({ ...payload, date: date }, env.JWT_ACCESS_SECRET!, { expiresIn: '30m' });
		const refreshToken: string = jwt.sign({ ...payload, date: date }, env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	};

	saveToken = async (userId: TokenModel['userId'], refreshToken: TokenModel['refreshToken']): Promise<string> => {

		const isTokenFoundInDB: boolean | undefined = await tokenRepositoty.searchToken(userId);

		let token: string;
		if (isTokenFoundInDB!) {
			const updateTokenInSQL: SQLTokenModel = await tokenRepositoty.updateToken({ userId, refreshToken });
			const updatedToken = new TokenDTO(updateTokenInSQL);
			token = updatedToken.refreshToken;
		} else {
			const createTokenInSQL: SQLTokenModel = await tokenRepositoty.createToken({ userId, refreshToken });
			const createdToken = new TokenDTO(createTokenInSQL);
			token = createdToken.refreshToken;
		}
		return token;

	};

	removeToken = async (refreshToken: string): Promise<TokenModel> => {
		const delToken: SQLTokenModel = await tokenRepositoty.deleteToken(refreshToken);

		const token = new TokenDTO(delToken);
		return token;
	};

	validationAccessToken = (token: string): number | null => {
		try {
			const checkedToken: string | JwtPayload = jwt.verify(token, env.JWT_ACCESS_SECRET!);
			return (typeof checkedToken === `object` && `id` in checkedToken) ?
				checkedToken.id as number : null;
		} catch (error) {
			return null;
		}
	};

	validationRefreshToken = (token: string): number | null => {
		try {
			const checkedToken: any = jwt.verify(token, env.JWT_REFRESH_SECRET!);
			return (typeof checkedToken === `object` && `id` in checkedToken) ?
				checkedToken.id as number : null;
		} catch (error) {

			return null;
		}
	};

}

export const tokenService = new TokenService();
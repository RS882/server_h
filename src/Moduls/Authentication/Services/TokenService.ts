import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TokenGenerateModel } from '../Models/TokenGenerateModel';
import { TokenModel } from '../Models/TokenModel';

import { tokenRepositoty } from '../Repository/TokenRepository';

import { UserDTOModel } from '../Models/UserDTOModel';
import { SQLTokenModel } from '../Models/SQLModels/SQLTokenModel';
import { TokenDTO } from '../DTOs/TokenDTO';



class TokenService {

	generateTokens = (payload: UserDTOModel): TokenGenerateModel => {
		const accessToken: string = jwt.sign(payload, env.JWT_ACCESS_SECRET!, { expiresIn: '30m' });
		const refreshToken: string = jwt.sign(payload, env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });
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

}

export const tokenService = new TokenService();
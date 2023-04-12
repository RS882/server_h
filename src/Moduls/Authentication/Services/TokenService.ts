import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TokenGenerateModel } from '../Models/TokenGenerateModel';
import { TokenModel } from '../Models/TokenModel';
import { log } from 'console';
import { tokenRepositoty } from '../Repository/TokenRepository';
import { read } from 'fs';
import { UserRegMessageModel } from '../Models/UserRegMessageModel';
import { UserDTOModel } from '../Models/UserDTOModel';



class TokenService {

	generateTokens = (payload: UserDTOModel): TokenGenerateModel => {
		const accessToken: string = jwt.sign(payload, env.JWT_ACCESS_SECRET!, { expiresIn: '30m' });
		const refreshToken: string = jwt.sign(payload, env.JWT_REFRESH_SECRET!, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	};

	saveToken = async (userId: TokenModel['userId'], refreshToken: TokenModel['refreshToken']): Promise<string> => {

		const isTokenFoundInDB: boolean = await tokenRepositoty.searchToken(userId);

		let token: string;
		if (isTokenFoundInDB) {
			const updateTokenInSQL: TokenModel = await tokenRepositoty.updateToken({ userId, refreshToken });
			token = updateTokenInSQL.refreshToken;
		} else {
			const createTokenInSQL: TokenModel = await tokenRepositoty.createToken({ userId, refreshToken });
			token = createTokenInSQL.refreshToken;
		}
		return token;

	};

}

export const tokenService = new TokenService();
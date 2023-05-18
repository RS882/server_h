import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TokenModel } from '../Models/TokenModel';
import { tokenRepositoty } from '../Repository/TokenRepository';
import { SQLTokenModel } from '../Models/SQLModels/SQLTokenModel';
import { TokenDTO } from '../DTOs/TokenDTO';
import { JwtPayload } from 'jsonwebtoken';
import { updateOrCreateTokenType } from '../Repository/TokenRespository';
import { GenerateTokensType, ITokenService, RemoveTokenType, SaveTokenType, SearchTokenType, ValidatinTokenType } from './TokenService.d';



class TokenService implements ITokenService {

	#validationToken = (token: string, key: string): number | null => {
		const checkedToken: string | JwtPayload = jwt.verify(token, key);
		return (typeof checkedToken === `object` && `id` in checkedToken) ?
			checkedToken.id as number : null;
	};

	generateTokens: GenerateTokensType = (payload) => {
		const date = new Date();
		const accessToken: string = jwt.sign({ ...payload, date: date }, env.JWT_ACCESS_SECRET!, { expiresIn: '10s' });
		const refreshToken: string = jwt.sign({ ...payload, date: date }, env.JWT_REFRESH_SECRET!, { expiresIn: '15d' });
		return { accessToken, refreshToken };
	};

	saveToken: SaveTokenType = async (userId, refreshToken) => {
		const isTokenFoundInDB: boolean | undefined = await tokenRepositoty.searchToken(userId);
		const updatedOrCreatedToken = async (func: updateOrCreateTokenType,
			id = userId, token = refreshToken): Promise<string> => {
			const tokenInSQL: SQLTokenModel = await func(id, token);
			const tokenAPI: TokenModel = new TokenDTO(tokenInSQL);
			return tokenAPI.refreshToken;
		};
		return await updatedOrCreatedToken(tokenRepositoty[isTokenFoundInDB! ? 'updateToken' : 'createToken']);

	};

	removeToken: RemoveTokenType = async (refreshToken) => {
		const delToken: SQLTokenModel = await tokenRepositoty.deleteToken(refreshToken);
		const tokens: TokenModel = new TokenDTO(delToken);
		return tokens;
	};

	validationAccessToken: ValidatinTokenType = (token) => {
		try {
			return this.#validationToken(token, env.JWT_ACCESS_SECRET!)
		} catch (error) {
			return null;
		}
	};

	validationRefreshToken: ValidatinTokenType = (token) => {
		try {
			return this.#validationToken(token, env.JWT_REFRESH_SECRET!)
		} catch (error) {
			return null;
		}
	};

	searchToken: SearchTokenType = async (refreshToken) =>
		await tokenRepositoty.searchTokenWithRefreshToken(refreshToken);

}

export const tokenService = new TokenService();
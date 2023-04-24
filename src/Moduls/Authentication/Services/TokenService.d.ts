
export type ValidatinTokenType = (token: string) => number | null;
export type GenerateTokensType = (payload: UserDTOModel) => TokenGenerateModel;
export type SaveTokenType = (userId: number, refreshToken: string) => Promise<string>;
export type RemoveTokenType = (refreshToken: string) => Promise<TokenModel>;
export type SearchTokenType = (refreshToken: string) => Promise<boolean>;

export interface ITokenService {
	generateTokens: GenerateTokensType;
	saveToken: SaveTokenType;
	removeToken: RemoveTokenType;
	validationAccessToken: ValidatinTokenType;
	validationRefreshToken: ValidatinTokenType;
	searchToken: SearchTokenType;
};

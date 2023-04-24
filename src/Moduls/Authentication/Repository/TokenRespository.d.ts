import { TokenModel } from "../Models/TokenModel";
import { SQLTokenModel } from "../Models/SQLModels/SQLTokenModel";


export type updateOrCreateTokenType =
	(userId: number, refreshToken: string) => Promise<SQLTokenModel>;
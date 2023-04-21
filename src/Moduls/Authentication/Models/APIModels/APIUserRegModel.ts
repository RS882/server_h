import { TokenGenerateModel } from "../TokenGenerateModel";
import { UserDTOModel } from "../UserDTOModel";

export interface APIUserModel extends TokenGenerateModel {
	user: UserDTOModel;

}
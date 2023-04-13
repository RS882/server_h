import { TokenGenerateModel } from "../TokenGenerateModel";
import { UserDTOModel } from "../UserDTOModel";

export interface APIUserRegModel extends TokenGenerateModel {
	user: UserDTOModel;

}
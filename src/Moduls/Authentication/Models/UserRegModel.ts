import { TokenGenerateModel } from "./TokenGenerateModel";
import { UserDTOModel } from "./UserDTOModel";

export interface UserRegModel extends TokenGenerateModel {
	user: UserDTOModel;

}
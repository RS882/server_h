import { ActivationLinkModel } from "../Models/ActivationLinkModel";

class MailService {

	sendActivationLink = async (to: ActivationLinkModel['to'],
		link: ActivationLinkModel['link']): Promise<void> => {

	};
}

export const mailService = new MailService();
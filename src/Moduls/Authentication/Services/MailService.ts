import { env } from 'process';
import { createTransport } from "nodemailer";
import { sendActivationLinkType, IMailsService } from './MailService.d';

class MailService implements IMailsService {

	transporter;

	constructor() {
		this.transporter = createTransport({
			host: env.SMTPT_HOST,
			port: +env.SMPT_PORT!,
			secure: false, // true for 465, false for other ports
			// service: 'gmail',
			auth: {
				user: env.SMPT_USER, // generated ethereal user
				pass: env.SMPT_PASSWORD,
			},
		})
	};
	sendActivationLink: sendActivationLinkType = async ({ to, link }) => {
		// try {
		const sendMail = await this.transporter.sendMail({
			from: env.SMPT_USER,
			to,
			subject: `Activation of the account on ${env.API_URL}`,
			text: ``,
			html: `
			<div>
				<h1> For activation, follow the link</h1>
				<a href="${link}">${link} </a>
			</div>
			`,
		})

		// } catch (error) {
		// 	console.log(error);

		// }

	};
}

export const mailService = new MailService();


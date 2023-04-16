"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const process_1 = require("process");
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.sendActivationLink = async (to, link) => {
            try {
                const sendMail = await this.transporter.sendMail({
                    from: process_1.env.SMPT_USER,
                    to,
                    subject: `Activation of the account on ${process_1.env.API_URL}`,
                    text: ``,
                    html: `
			<div>
				<h1> For activation, follow the link</h1>
				<a href="${link}">"${link} </a>
			</div>
			`,
                });
                // console.log(sendMail);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: process_1.env.SMTPT_HOST,
            port: +process_1.env.SMPT_PORT,
            secure: false,
            // service: 'gmail',
            auth: {
                user: process_1.env.SMPT_USER,
                pass: process_1.env.SMPT_PASSWORD,
            },
        });
    }
    ;
}
exports.mailService = new MailService();

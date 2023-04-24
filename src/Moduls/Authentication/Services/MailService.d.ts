
import { Transporter } from 'nodemailer';
import { ActivationLinkModel } from './../Models/ActivationLinkModel';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type sendActivationLinkType = ({ to, link }: ActivationLinkModel) => Promise<void>;

export interface IMailsService {
	transporter: Transporter<SMTPTransport.SentMessageInfo>;
	sendActivationLink: sendActivationLinkType;
}
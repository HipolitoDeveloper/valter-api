import { Type, Static } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import Constants from '../../common/constants'
import { UserInterface } from "./User";


const SendResetPasswordBody = Type.Pick(UserInterface, ['email', 'username'])
const UpdateResetPasswordBody = Type.Pick(UserInterface, ['email', 'password'])


export type TSendResetPasswordBody = Static<typeof SendResetPasswordBody>;
export type TUpdateResetPasswordBody = Static<typeof UpdateResetPasswordBody>;

export const ResetPasswordResponse = Type.Object({  
    message: Type.String()
})

export type TResetPasswordResponse = Static<typeof ResetPasswordResponse>

const ResetPasswordError = Type.Object(
	{
		statusCode: Type.Literal(500, { default: 500 }),
		code: Type.String({
			default: Constants.SYSTEM_ERRO_UNSEND_EMAIL_CODE,
			examples: [
				Constants.SYSTEM_ERRO_UNSEND_EMAIL_CODE,
				Constants.SYSTEM_ERRO_DUPLICATED_USER_CODE,	
				Constants.SYSTEM_ERRO_USER_NOTFOUND_CODE
			],
		}),
		message: Type.String({
			default: Constants.SYSTEM_ERRO_UNSEND_EMAIL_MESSAGE,
			examples: [
				Constants.SYSTEM_ERRO_UNSEND_EMAIL_MESSAGE,	
				Constants.SYSTEM_ERRO_DUPLICATED_USER_MESSAGE,
				Constants.SYSTEM_ERRO_USER_NOTFOUND_MESSAGE
			],
		}),
	},
	{
		description: 'A redefinição de senha não foi concluída',
	}
);

export const SendResetPasswordSchema: FastifySchema = {
    // summary: 'Autenticar usuário',
	// tags: ['user'],
	body: SendResetPasswordBody,
	response: {
		200: ResetPasswordResponse,
		500: ResetPasswordError
	},
}

export const UpdateResetPasswordSchema: FastifySchema = {
    // summary: 'Autenticar usuário',
	// tags: ['user'],
	body: UpdateResetPasswordBody,
	response: {
		200: ResetPasswordResponse,
		500: ResetPasswordError
	},
}

export type TSendResetPasswordService = {
    Body: TSendResetPasswordBody,
    Reply: TResetPasswordResponse
}

export type TUpdateResetPasswordService = {
    Body: TUpdateResetPasswordBody,
    Reply: TResetPasswordResponse
}
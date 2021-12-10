import { Type, Static } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import Constants from '../../common/constants'
import { UserInterface } from "./User";


const SigninUserBody = Type.Pick(UserInterface, ['password', 'email'])

export type TSigninUserBody = Static<typeof SigninUserBody>;

export const SigninUserResponse = Type.Object({  
    token: Type.String(),
    message: Type.String()
})

export type TSigninUserResponse = Static<typeof SigninUserResponse>

const SigninUserError = Type.Object(
	{
		statusCode: Type.Literal(400, { default: 400 }),
		code: Type.String({
			default: Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_CODE,
			examples: [
				Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_CODE,	
                Constants.SYSTEM_ERRO_USERNOTFOUND_CODE		
			],
		}),
		message: Type.String({
			default: Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_CODE,
			examples: [
				Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_MESSAGE,		
                Constants.SYSTEM_ERRO_USERNOTFOUND_MESSAGE	
			],
		}),
	},
	{
		description: 'As credenciais estão erradas',
	}
);

export const SigninUserSchema: FastifySchema = {
    // summary: 'Autenticar usuário',
	// tags: ['user'],
	body: SigninUserBody,
	response: {
		201: SigninUserResponse,
		400: SigninUserError,
	},
}

export type TSigninUserService = {
    Body: TSigninUserBody,
    Reply: TSigninUserResponse
}
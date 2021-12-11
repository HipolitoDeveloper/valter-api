import { Type, Static } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import Constants from '../../common/constants'
import { UserInterface } from "./User";


const SignupUserBody = Type.Pick(UserInterface, ['username', 'password', 'email'])

export type TSignupUserBody = Static<typeof SignupUserBody>;

export const SignupUserResponse = Type.Object({  
    token: Type.String(),
    message: Type.String()
})

export type TSignupUserResponse = Static<typeof SignupUserResponse>

const SignupUserError = Type.Object(
	{
		statusCode: Type.Literal(400, { default: 400 }),
		code: Type.String({
			default: Constants.SYSTEM_ERRO_DUPLICATED_USER_CODE,
			examples: [
				Constants.SYSTEM_ERRO_DUPLICATED_USER_CODE,			
			],
		}),
		message: Type.String({
			default: Constants.SYSTEM_ERRO_DUPLICATED_USER_MESSAGE,
			examples: [
				Constants.SYSTEM_ERRO_DUPLICATED_USER_MESSAGE,			
			],
		}),
	},
	{
		description: 'usuário com esse email ou telefone já existe',
	}
);

export const SignupUserSchema: FastifySchema = {
    // summary: 'Cadastrar usuário',
	// tags: ['user'],
	body: SignupUserBody,
	response: {
		201: SignupUserResponse,
		400: SignupUserError,
	},
}

export type TSignupUserService = {
    Body: TSignupUserBody,
    Reply: TSignupUserResponse
}
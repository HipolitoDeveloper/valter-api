import { generateBearerToken } from "../../../utils/AuthService";
import { TSignupUserBody, TSigninUserBody } from "../schemas";
import { TGetUsersParams } from "../schemas/GetUsers";
import { UserModel } from "../UserModel";
import bcrypt from 'bcrypt'
import {handleMongooseUniqueConstraintError, BadRequestError, UnauthorizedError} from '../../common/erros'
import Constants from '../../common/constants'

export default class UserController {
    static async findAll({ token }: TGetUsersParams) {
        const users = await UserModel.find({})

        return users
    }

    static async signUp(user: TSignupUserBody) {
        const { password } = user;
        const cryptedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await UserModel.create({ ...user, password: cryptedPassword })
            if (!newUser) return { error: true, message: "Não foi possível cadastrar o usuário", token: "" }
            return  {message: "Usuário cadastrado com sucesso", token: generateBearerToken(newUser._id)}
            
        } catch (error) {
            const uniqueConstraintField = handleMongooseUniqueConstraintError(error)
            if(uniqueConstraintField === "email") {
                throw new BadRequestError(Constants.SYSTEM_ERRO_DUPLICATEDUSER_CODE, Constants.SYSTEM_ERRO_DUPLICATEDUSER_MESSAGE)
            }
            
            throw error
        }
    }

    static async signIn(payload: TSigninUserBody) {
        try {
            const {email, password} = payload
            const authUser: any = await UserModel.find({email: email});

            if(!authUser) {
                throw new UnauthorizedError(
                    Constants.SYSTEM_ERRO_USERNOTFOUND_CODE,
                    Constants.SYSTEM_ERRO_USERNOTFOUND_MESSAGE
                )
            }

            const passwordMatches = await bcrypt.compare(password, authUser.password);
            if (!passwordMatches) {
                throw new UnauthorizedError(
                    Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_CODE,
                    Constants.SYSTEM_ERRO_USERINVALIDPASSWORD_MESSAGE
                );
            }

            return {message: "Usuário foi autenticado com sucesso", token: generateBearerToken(authUser._id)}
        } catch (error) {
            throw error
        }
    }
}

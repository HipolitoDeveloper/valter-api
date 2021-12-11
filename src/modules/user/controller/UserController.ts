import bcrypt from 'bcrypt';
import resetPasswordTemplate from '../../../templates/reset-password-email';
import { generateBearerToken } from "../../../utils/AuthService";
import Constants from '../../common/constants';
import { BadRequestError, EmailError, handleMongooseUniqueConstraintError, UnauthorizedError } from '../../common/erros';
import { TSendResetPasswordBody, TSigninUserBody, TSignupUserBody, TUpdateResetPasswordBody } from "../schemas";
import { TGetUsersParams } from "../schemas/GetUsers";
import { UserModel } from "../UserModel";

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
            if (!newUser) throw new BadRequestError(
                Constants.SYSTEM_ERRO_USER_NOTCREATED_CODE,
                Constants.SYSTEM_ERRO_USER_NOTCREATED_MESSAGE,
            )

            return  {message: Constants.SYSTEM_SUCCESS_USER_SIGNUP_MESSAGE, token: generateBearerToken(newUser._id)}            
        } catch (error) {
            const uniqueConstraintField = handleMongooseUniqueConstraintError(error)
            if(uniqueConstraintField === "email") {
                throw new BadRequestError(Constants.SYSTEM_ERRO_DUPLICATED_USER_CODE, Constants.SYSTEM_ERRO_DUPLICATED_USER_MESSAGE)
            }
            
            throw error
        }
    }

    static async signIn(payload: TSigninUserBody) {
        try {

            const {email, password} = payload
            const authUser: any = await UserModel.findOne({email: email});

            if(!authUser) {
                throw new UnauthorizedError(
                    Constants.SYSTEM_ERRO_USER_NOTFOUND_CODE,
                    Constants.SYSTEM_ERRO_USER_NOTFOUND_MESSAGE
                )
            }

            const passwordMatches = await bcrypt.compare(password, authUser.password);
            if (!passwordMatches) {
                throw new UnauthorizedError(
                    Constants.SYSTEM_ERRO_USER_INVALIDPASSWORD_CODE,
                    Constants.SYSTEM_ERRO_USER_INVALIDPASSWORD_MESSAGE
                );
            }

            return {message: Constants.SYSTEM_SUCCESS_USER_SIGNIN_MESSAGE, token: generateBearerToken(authUser._id)}
        } catch (error) {
            throw error
        }
    }

    static async resetPassword(payload: TUpdateResetPasswordBody) {
        const { email, password } = payload;
        const cryptedPassword = await bcrypt.hash(password, 10);

        try {
            const updatedUser: any = await UserModel.findOneAndUpdate({email: email},{password: cryptedPassword },{returnOriginal: true})           
            if (!updatedUser) throw new BadRequestError (
                Constants.SYSTEM_ERRO_USER_NOTFOUND_CODE,
                Constants.SYSTEM_ERRO_USER_NOTFOUND_MESSAGE
            ) 

            return  {message: Constants.SYSTEM_SUCCESS_USER_RESETPASSWORD_MESSAGE, token: generateBearerToken(updatedUser._id)}            
        } catch (error) {
            const uniqueConstraintField = handleMongooseUniqueConstraintError(error)
            if(uniqueConstraintField === "email") {
                throw new BadRequestError(Constants.SYSTEM_ERRO_DUPLICATED_USER_CODE, Constants.SYSTEM_ERRO_DUPLICATED_USER_MESSAGE)
            }
            
            throw error
        }
    }

    static async sendResetPasswordEmail(payload: TSendResetPasswordBody, nodemailer: any) {
        const {email, username} = payload;
        const template = resetPasswordTemplate(username)

        nodemailer.sendMail({
            from: 'hipolitodeveloper@gmail.com',
            to: email,
            subject: 'foo',
            text: 'bar',
            html: template              
      }, (err: any, info: any) => {
        if (err) {
            throw new EmailError(
                Constants.SYSTEM_ERRO_UNSEND_EMAIL_CODE,
                Constants.SYSTEM_ERRO_UNSEND_EMAIL_MESSAGE
            )
        } 
        return {message: Constants.SYSTEM_SUCCESS_USER_SENDEMAIL_MESSAGE}
      })   

    }
}

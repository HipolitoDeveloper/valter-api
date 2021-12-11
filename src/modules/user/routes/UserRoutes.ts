import { FastifyPluginCallback } from "fastify";
import {
    GetUsersSchema, 
    TGetUsersService, 
    TSignupUserService, 
    SignupUserSchema, 
    TSigninUserService, 
    SigninUserSchema, 
    TSendResetPasswordService,
    SendResetPasswordSchema, 
    TUpdateResetPasswordService, 
    UpdateResetPasswordSchema } from "../schemas";
import UserController from "../controller/UserController";
import passport from 'fastify-passport';



const UserRoutes: FastifyPluginCallback = (app, _, done) => {
    app.get<TGetUsersService>(
        '/', {
        preValidation: passport.authenticate('bearer', { session: false }),
        schema: GetUsersSchema
    },
        async (req, reply) => {
            const users = await UserController.findAll(req.query)
            console.log(users)

            reply.status(200).send(users);
        }
    )

    app.post<TSignupUserService>(
        '/', {
        schema: SignupUserSchema
    },
        async (req, reply) => {
            const response = await UserController.signUp(req.body)
            console.log("response", response)
            reply.status(200).send(response)
        }
    )

    app.post<TSigninUserService>(
        '/auth', {
        schema: SigninUserSchema
    },
        async (req, reply) => {
            const response = await UserController.signIn(req.body)
            reply.status(200).send(response)
        }
    )

    app.put<TSendResetPasswordService>(
        '/reset-password/send', {
        schema: SendResetPasswordSchema
    },
        async (req, reply) => {

            const response: any = await UserController.sendResetPasswordEmail(req.body, app.nodemailer)
            reply.status(200).send(response)
        }
    )

    app.put<TUpdateResetPasswordService>(
        '/reset-password/update', {
        schema: UpdateResetPasswordSchema
    },
        async (req, reply) => {

            const response: any = await UserController.resetPassword(req.body)
            reply.status(200).send(response)
        }
    )

    done();
}

export default UserRoutes

import {FastifyPluginCallback} from "fastify";
import {GetUsersSchema,  TGetUsersService, TSignupUserService, SignupUserSchema, TSignupUserResponse} from "../schemas";
import UserController from "../controller/UserController";
import passport from 'fastify-passport';
const UserRoutes: FastifyPluginCallback = (app, _, done) => {
    app.get<TGetUsersService>(
        '/', {
            preValidation: passport.authenticate('bearer', {session: false}),
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

    app.post<TSignupUserService>(
        '/auth', {
            schema: SignupUserSchema
        },
        async (req, reply) => {
            const response = await UserController.signIn(req.body)
            reply.status(200).send(response)
        }
    )

    done();
}

export default UserRoutes

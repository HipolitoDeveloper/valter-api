import {FastifyPluginCallback} from "fastify";
import {GetUsersSchema,  TGetUsersService} from "../schemas/GetUsers";
import UserController from "../controller/UserController";

const UserRoutes: FastifyPluginCallback = (app, _, done) => {
    app.get<TGetUsersService>(
        '/', {
            schema: GetUsersSchema
        },
        async (req, reply) => {
            const users = await UserController.findAll(req.query)
            console.log(users)

            reply.status(200).send(users);
        }
    )

    done();
}

export default UserRoutes

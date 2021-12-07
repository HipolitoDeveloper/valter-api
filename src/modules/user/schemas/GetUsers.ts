import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {UserModel} from "../UserModel";
import {TUser, UserInterface} from "./User";

const GetUsersParams = Type.Object({
    token: Type.String()
})

export type TGetUsersParams = Static<typeof GetUsersParams>


export const GetUsersResponse = Type.Object({
    result: Type.String({default: 'OK'})
}, {description: "Usuários listados com sucesso"})


const Response = (Type.Array(Type.Omit(UserInterface, ['shoplist_id', 'pantry_id', 'saved_recipes', 'favorite_recipes', 'favorite_product', 'notification'])));

export const GetUsersSchema: FastifySchema = {
    summary: 'Lista todos os usuários do banco',
    tags: ['user'],
    querystring: GetUsersParams,
    response: {
        200: Response,
        // 400: CreatedUserError,
    },
}

// export type TGetUsersService = {
//     Body: TGetUsersBody,
//     Response: TGetUsersResponse
// }

export type TGetUsersService = {
    Querystring: TGetUsersParams,
    Reply: TUser[]
}

import {TGetUsersParams} from "../schemas/GetUsers";
import {UserModel} from "../UserModel";

export default class UserController {
    static async findAll({token}: TGetUsersParams) {
        const users = await UserModel.find({})

        return users
    }
}

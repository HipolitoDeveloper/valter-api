import { Schema, model, connect } from 'mongoose';
import {TUser} from "./schemas/User";

const schema = new Schema<TUser>({
    token: String,
    username: String,
    password: String,
    email: String,
    birthday: String,
    shoplist_id: Object,
    pantry_id: Object,
    saved_recipes: Array,
    favorite_recipes: Object,
    favorite_product: Object,
    notification: Array,
    created_at: String,
    updated_at: String
})


export const UserModel = model<TUser>('User', schema);

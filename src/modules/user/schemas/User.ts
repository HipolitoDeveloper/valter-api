import {Static, Type} from '@sinclair/typebox';
import {RecipeInterface} from "../../recipe/schemas/Recipe";
import {ProductInterface} from "../../product/schemas/Product";
import {NotificationInterface} from "../../notification/schemas/Notification";

export const UserInterface = Type.Object({
    id: Type.String(),
    token: Type.String(),
    username: Type.RegEx(/^[a-zA-Z]+$/i),
    password: Type.String({format: 'email', examples: ['admin@trackage.com.br']}),
    email: Type.String(),
    birthday: Type.String({format: 'date-time'}),
    shoplist_id: Type.Object({}),
    pantry_id: Type.Object({}),
    saved_recipes: Type.Array({...Type.Pick(RecipeInterface, ['id', 'category_id', 'name', 'qt_portion', 'duration'])}),
    favorite_recipes: Type.Object({...Type.Pick(RecipeInterface, ['id', 'category_id', 'name', 'qt_portion', 'duration'])}),
    favorite_product: Type.Object({...Type.Pick(ProductInterface, ['id', 'name'])}),
    notification: Type.Array({
        ...Type.Pick(NotificationInterface, ['uid', 'description']),
        date_to_show: Type.String({format: 'date-time'}),
    }),
    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),

});


export type TUser = Static<typeof UserInterface>;

export const UserId = Type.String();

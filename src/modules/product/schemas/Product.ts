import {Static, Type} from "@sinclair/typebox";
import {PortionTypeEnum} from "../../common/enums/PortionType";
import {RecipeInterface} from "../../recipe/schemas/Recipe";
import {CategoryInterface} from "../../category/schemas/Category";

export const ProductInterface = Type.Object({
    id: Type.String(),
    category_id: Type.Object(Type.Pick(CategoryInterface, ['uid'])),
    name: Type.String(),
    portion_types: Type.Array(Type.Object({
        uid: Type.Enum(PortionTypeEnum)
    }), {
        default: [
            {uid: 'un'},
            {uid: 'g'}]
    }),
    description: Type.String(),
    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),
})

export type TProduct = Static<typeof ProductInterface>;

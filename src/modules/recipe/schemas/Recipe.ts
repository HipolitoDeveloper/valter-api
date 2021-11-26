import {Static, Type} from "@sinclair/typebox";
import {UserId, UserInterface} from "../../user/schemas/User";
import {ProductInterface} from "../../product/schemas/Product";
import {PortionTypeEnum} from "../../common/enums/PortionType";
import {CategoryInterface} from "../../category/schemas/Category";


export const RecipeInterface = Type.Object({
    id: Type.String(),
    category_id: Type.Object(Type.Pick(CategoryInterface, ['uid'])),
    name: Type.String(),
    qt_portion: Type.Integer(),
    duration: Type.Integer(),
    created_by: UserId,
    available: Type.Boolean({default: false}),
    complete_creation: Type.Boolean({default: false}),
    steps: Type.Array(Type.Object({
        description: Type.String(),
        position: Type.Integer(),
    })),

    ingredients:
        Type.Array({
                ...Type.Pick(ProductInterface, ['id', 'name', 'description', 'portion_types']),
                portion_type: Type.Enum(PortionTypeEnum, {default: PortionTypeEnum.GRAMAS})
            }
        ),

    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),

})

export type TRecipe = Static<typeof RecipeInterface>;

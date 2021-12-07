import {Type} from "@sinclair/typebox";
import {RecipeInterface} from "../../recipe/schemas/Recipe";

export const MealInterface = Type.Object({
    id: Type.String(),
    date: Type.String({format: 'date-time'}),
    breakfast: Type.Array({
        ...Type.Pick(RecipeInterface, ['id', 'duration', 'name']),
        cooked: Type.Boolean({default: false}),
        affordable: Type.Boolean({default: false})
    }),
    lunch: Type.Array({
        ...Type.Pick(RecipeInterface, ['id', 'duration', 'name']),
        cooked: Type.Boolean({default: false}),
        affordable: Type.Boolean({default: false})
    }),
    dinner: Type.Array({
        ...Type.Pick(RecipeInterface, ['id', 'duration', 'name']),
        cooked: Type.Boolean({default: false}),
        affordable: Type.Boolean({default: false})
    }),
    others: Type.Array({
        ...Type.Pick(RecipeInterface, ['id', 'duration', 'name']),
        cooked: Type.Boolean({default: false}),
        affordable: Type.Boolean({default: false})
    }),
    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),

})

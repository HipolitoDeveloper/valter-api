import {Static, Type} from "@sinclair/typebox";
import {CategoryTypeEnum} from "../../common/enums/CategoryType";
import {CategoryUIDEnum} from "../../common/enums/CategoryUID";
import {UserInterface} from "../../user/schemas/User";

export const CategoryInterface = Type.Object({
    id: Type.String(),
    uid: Type.Enum(CategoryUIDEnum), //Mudar
    name: Type.String(),
    type: Type.Enum(CategoryTypeEnum),
    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),

})


export type TCategory = Static<typeof CategoryInterface>;

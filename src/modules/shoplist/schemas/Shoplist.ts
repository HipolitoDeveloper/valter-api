import {Static, Type} from "@sinclair/typebox";
import {ProductInterface} from "../../product/schemas/Product";
import {PortionTypeEnum} from "../../common/enums/PortionType";

export const ShoplistInterface = Type.Object({
    id: Type.String(),
    products: Type.Array({
        ...Type.Pick(ProductInterface, ['id', 'name', 'portion_types', 'description']),
        portion: Type.Number(),
        portion_type: Type.Enum(PortionTypeEnum, {default: PortionTypeEnum.GRAMAS})
    }),
    created_at: Type.String({format: 'date-time'}),
    updated_at: Type.String({format: 'date-time'}),
})

export type TShoplist = Static<typeof ShoplistInterface>;

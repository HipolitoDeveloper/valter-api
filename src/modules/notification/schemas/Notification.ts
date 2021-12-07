import {Type} from "@sinclair/typebox";
import {NotificationUID} from "../../common/enums/NotificationUID";

export const NotificationInterface = Type.Object({
    id: Type.String(),
    uid: Type.Enum(NotificationUID),
    description: Type.String()
})

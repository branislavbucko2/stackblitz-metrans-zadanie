import {UserTypeNumericEnum} from "../enums/user-type-numeric.enum";
import {UserTypeEnum} from "../enums/user-type.enum";

export interface UserType {
    id: UserTypeNumericEnum;
    value: UserTypeEnum;
}
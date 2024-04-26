import {Pipe, PipeTransform} from "@angular/core";
import {UserTypeEnum} from "../enums/user-type.enum";
import {UserService} from "../services/user.service";

@Pipe({
    name: 'getUserType',
    standalone: true
})
export class GetUserTypePipe implements PipeTransform {

    constructor(
        private userService: UserService
    ) {
    }
    public transform(userId: number): UserTypeEnum {
        console.warn('transform')
        return this.userService.userTypeMap.get(userId) || UserTypeEnum.Unknown;
    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { UserTypeEnum } from '../enums/user-type.enum';
import { UserService } from '../services/user.service';

/**
 * An Angular pipe that retrieves the user type based on a given user ID.
 */
@Pipe({
    name: 'getUserType',
    standalone: true,
})
export class GetUserTypePipe implements PipeTransform {
    constructor(private userService: UserService) {}

    /**
     * Transforms a user ID into the corresponding user type.
     *
     * @param {number} userId - The ID of the user to get the type for.
     * @returns {UserTypeEnum} The corresponding user type or `UserTypeEnum.Unknown` if not found.
     *
     * @example
     * <!-- Usage in Angular template -->
     * <div>{{ someUserId | getUserType }}</div>
     *
     * @example
     * // Usage in Angular component
     * const userType = this.getUserTypePipe.transform(1);
     * console.log(userType); // Expected output: UserTypeEnum.Admin
     */
    public transform(userId: number): UserTypeEnum {
        return this.userService.userTypeMap.get(userId) || UserTypeEnum.Unknown;
    }
}

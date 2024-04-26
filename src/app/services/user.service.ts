import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserTypeEnum } from '../enums/user-type.enum';
import { UserTypeNumericEnum } from '../enums/user-type-numeric.enum';

/**
 * A service for interacting with the user-related API.
 */
@Injectable({
    providedIn: 'root',
})
export class UserService {
    /**
     * The base URL for the user-related API.
     */
    private readonly USER_API: string = 'https://jsonplaceholder.typicode.com/todos';

    /**
     * A map from numeric user type to user type enum.
     */
    public readonly userTypeMap: Map<UserTypeNumericEnum, UserTypeEnum> = new Map([
        [UserTypeNumericEnum.Admin, UserTypeEnum.Admin],
        [UserTypeNumericEnum.Tester, UserTypeEnum.Tester],
    ]);

    constructor(private http: HttpClient) {}

    /**
     * Retrieves a list of users from the API.
     *
     * @returns {Observable<User[]>} An observable containing the list of users.
     *
     * @example
     * this.userService.getUserListAsDataSource().subscribe(users => {
     *   console.log(users);
     * });
     */
    public getUserListAsDataSource(): Observable<User[]> {
        return this.http.get<User[]>(this.USER_API);
    }

    /**
     * Creates a new user by sending a POST request to the API.
     *
     * @param {User} user - The user to create.
     * @returns {Observable<User>} An observable containing the created user.
     *
     * @example
     * const newUser: User = { id: 1, userId: 2, title: 'New User', completed: false };
     * this.userService.createUser(newUser).subscribe(createdUser => {
     *   console.log(createdUser);
     * });
     */
    public createUser(user: User): Observable<User> {
        return this.http.post<User>(this.USER_API, user);
    }

    /**
     * Updates an existing user by sending a PUT request to the API.
     *
     * @param {User} user - The user to update.
     * @returns {Observable<User>} An observable containing the updated user.
     *
     * @example
     * const updatedUser: User = { id: 1, userId: 2, title: 'Updated User', completed: true };
     * this.userService.updateUser(updatedUser).subscribe(updated => {
     *   console.log(updated);
     * });
     */
    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.USER_API}/${user.id}`, user);
    }

    /**
     * Deletes a user by sending a DELETE request to the API.
     *
     * @param {number} userId - The ID of the user to delete.
     * @returns {Observable<number>} An observable containing the ID of the deleted user.
     *
     * @example
     * this.userService.deleteUser(1).subscribe(deletedUserId => {
     *   console.log(`User with ID ${deletedUserId} deleted.`);
     * });
     */
    public deleteUser(userId: number): Observable<number> {
        return this.http.delete<void>(`${this.USER_API}/${userId}`).pipe(
            map(() => userId)
        );
    }
}

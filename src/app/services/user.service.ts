import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UserTypeEnum} from "../enums/user-type.enum";
import {UserTypeNumericEnum} from "../enums/user-type-numeric.enum";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly USER_API: string = 'https://jsonplaceholder.typicode.com/todos';

    public readonly userTypeMap: Map<UserTypeNumericEnum, UserTypeEnum> = new Map<UserTypeNumericEnum, UserTypeEnum>([
        [UserTypeNumericEnum.Admin, UserTypeEnum.Admin],
        [UserTypeNumericEnum.Tester, UserTypeEnum.Tester],
    ]);

    constructor(
        private http: HttpClient
    ) {
    }
    public getUserListAsDataSource(): Observable<User[]> {
        return this.http.get<User[]>(this.USER_API);
    }
}
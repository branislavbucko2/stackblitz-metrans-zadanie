import {Component, OnInit, ViewChild} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource
} from "@angular/material/table";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {GetUserTypePipe} from "../../pipes/get-user-type.pipe";
import {ColumnNameEnum} from "../../enums/column-name.enum";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-users-table',
    standalone: true,
    imports: [
        MatTable,
        MatHeaderRow,
        MatRow,
        MatColumnDef,
        MatCell,
        MatHeaderCell,
        MatCellDef,
        MatHeaderCellDef,
        MatRowDef,
        MatHeaderRowDef,
        MatPaginator,
        GetUserTypePipe,
        MatSortHeader,
        MatSort,
        MatCheckbox,
        MatIconButton,
        MatIcon,
        MatFabButton
    ],
    templateUrl: './users-table.component.html',
    styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    readonly displayedColumns: ColumnNameEnum[] = [ColumnNameEnum.UserId, ColumnNameEnum.Title, ColumnNameEnum.Completed, ColumnNameEnum.Actions];
    users!: MatTableDataSource<User>;

    constructor(
        private userService: UserService
    ) {
    }

    public ngOnInit(): void {
        this.userService.getUserListAsDataSource().subscribe(users => {
            console.warn('list: ', users);
            this.users = new MatTableDataSource<User>(users);
            this.users.paginator = this.paginator;
            this.users.sort = this.sort;
        })
    }

    public addRowAction(element: any): void {
        
    }

    addUser() {

    }

    editUser(element: any) {
        
    }

    deleteUser(element: any) {
        
    }
}

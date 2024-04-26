import { Component, OnInit, ViewChild } from '@angular/core';
import {
    MatTable,
    MatTableDataSource,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
} from '@angular/material/table';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { GetUserTypePipe } from '../../pipes/get-user-type.pipe';
import { ColumnNameEnum } from '../../enums/column-name.enum';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import {MatIconButton, MatFabButton, MatButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { AlertService } from '../../services/alert.service';

/**
 * A component that displays a table of users with various actions, such as adding, editing, and deleting users.
 */
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
        MatFabButton,
        MatButton,
    ],
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator; // The paginator for the table
    @ViewChild(MatSort) sort!: MatSort; // The sort functionality for the table
    users!: MatTableDataSource<User>; // Data source for the table

    /**
     * The columns displayed in the user table.
     */
    readonly displayedColumns: ColumnNameEnum[] = [
        ColumnNameEnum.UserId,
        ColumnNameEnum.Title,
        ColumnNameEnum.Completed,
        ColumnNameEnum.Actions,
    ];

    /**
     * Configuration for the MatDialog when opening user dialogs.
     */
    private readonly dialogConfig: MatDialogConfig = {
        width: '900px',
    };

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private alertService: AlertService
    ) {}

    /**
     * Initializes the component and fetches the user data.
     */
    public ngOnInit(): void {
        this.userService.getUserListAsDataSource().subscribe((users) => {
            this.users = new MatTableDataSource<User>(users);
            this.users.paginator = this.paginator; // Assign paginator
            this.users.sort = this.sort; // Assign sorting
        });
    }

    /**
     * Opens a dialog to add a new user.
     */
    public openAddUserDialog(): void {
        const dialogRef: MatDialogRef<UserDialogComponent> = this.dialog.open(UserDialogComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe((createdUser) => {
            if (createdUser) {
                this.users.data = [...this.users.data, createdUser];
                this.alertService.showAlert('User was successfully created!');
            }
        });
    }

    /**
     * Opens a dialog to edit an existing user.
     *
     * @param {User} selectedUser - The user to edit.
     */
    public openEditUserDialog(selectedUser: User): void {
        const dialogRef: MatDialogRef<UserDialogComponent>  = this.dialog.open(UserDialogComponent, {
            ...this.dialogConfig,
            data: selectedUser,
        });

        dialogRef.afterClosed().subscribe((updatedUser) => {
            if (updatedUser) {
                const existingUserIndex = this.users.data.findIndex(
                    (user) => user.id === updatedUser.id
                );

                if (existingUserIndex >= 0) {
                    const newData = [...this.users.data];
                    newData[existingUserIndex] = updatedUser; // Update user data
                    this.users.data = newData;
                    this.alertService.showAlert('User was successfully updated!');
                }
            }
        });
    }

    /**
     * Deletes a user by ID.
     *
     * @param {number} userId - The ID of the user to delete.
     */
    public deleteUser(userId: number): void {
        this.userService.deleteUser(userId).subscribe(() => {
            const userIndexToDelete = this.users.data.findIndex(
                (user) => user.id === userId
            );

            if (userIndexToDelete >= 0) {
                const newData = [...this.users.data];
                newData.splice(userIndexToDelete, 1);
                this.users.data = newData;
                this.alertService.showAlert('User was successfully deleted!');
            }
        });
    }

    /**
     * Opens a documentation page in a new tab.
     */
    public openDoc(): void {
        window.open('../../../assets/docs/index.html', '_blank');
    }
}

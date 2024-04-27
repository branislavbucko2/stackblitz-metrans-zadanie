import { Component, Inject, OnInit } from '@angular/core';
import {
    MatFormField,
    MatLabel,
} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserTypeNumericEnum } from '../../enums/user-type-numeric.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { UserType } from '../../models/user-type';
import { User } from '../../models/user';
import { UserFormGroupType } from '../../models/user-form';

/**
 * A dialog component for creating and updating users.
 * It uses Angular Reactive Forms to manage user data.
 */
@Component({
    selector: 'app-user-dialog',
    standalone: true,
    imports: [
        MatFormField,
        MatDialogActions,
        MatButton,
        ReactiveFormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatCheckbox,
        MatInput,
        MatSelect,
        MatOption,
        NgForOf,
        MatLabel,
    ],
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
    /**
     * The reactive form group used to manage user data.
     */
    userForm!: FormGroup<UserFormGroupType>;

    /**
     * Indicates if the dialog is in edit mode.
     */
    isEditMode!: boolean;

    /**
     * A list of user types for the form's dropdown.
     */
    readonly userIdTypeList: UserType[] = [
        { id: UserTypeNumericEnum.Admin, value: UserTypeEnum.Admin },
        { id: UserTypeNumericEnum.Tester, value: UserTypeEnum.Tester },
    ];

    constructor(
        public dialogRef: MatDialogRef<UserDialogComponent>, // Reference to the dialog
        @Inject(MAT_DIALOG_DATA) public userRow: User, // Injected data for the dialog
        private userService: UserService, // Injected UserService
    ) {}

    /**
     * Initializes the component, setting up the form and patching data if in edit mode.
     */
    public ngOnInit(): void {
        this.createUserForm(); // Initialize the form

        if (this.userRow) { // If there's data passed to the dialog
            this.userForm.patchValue(this.userRow); // Patch the form with existing data
        } else {
            this.userForm.reset(); // Reset the form for creating a new user
        }
    }

    /**
     * Closes the dialog.
     */
    public closeDialog(): void {
        this.dialogRef.close(); // Close the dialog without saving
    }

    /**
     * Saves the user form data and closes the dialog.
     */
    public onSave(): void {

        if (this.userForm.valid) { // Ensure the form is valid
            if (!this.userForm.get('id')?.value) { // If no ID, it's a new user
                this.userService.createUser(<User>this.userForm.value).subscribe((user) => {
                    this.dialogRef.close(user); // Close the dialog and return the created user
                });
            } else { // Otherwise, update the existing user
                this.userService.updateUser(<User>this.userForm.value).subscribe((user) => {
                    this.dialogRef.close(user); // Close the dialog and return the updated user
                });
            }
        }
    }

    /**
     * Creates the reactive form for user data.
     */
    private createUserForm(): void {
        this.userForm = new FormGroup<UserFormGroupType>({
            id: new FormControl(null),
            userId: new FormControl(null),
            title: new FormControl(null, Validators.required),
            completed: new FormControl(null),
        });
    }
}

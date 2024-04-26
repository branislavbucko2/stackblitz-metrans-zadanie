import {Component, OnInit} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";

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
    MatCheckbox
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit {

  userForm!: FormGroup;
  isEditMode!: boolean;

  public ngOnInit(): void {

  }

  private createUserForm(): void {
    this.userForm = new FormGroup<any>({
      userType: new FormControl(null),
      title: new FormControl(null),
      completed: new FormControl(null)
    })
  }

  onCancel() {

  }

  onSave() {

  }
}

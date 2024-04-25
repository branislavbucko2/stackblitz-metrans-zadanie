import {Routes} from '@angular/router';
import {UsersTableComponent} from "./components/users-table/users-table.component";

export const appRoutes: Routes = [
    {path: 'users', component: UsersTableComponent},
    {path: '', redirectTo: '/users', pathMatch: 'full'},
];
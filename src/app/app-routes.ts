import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';

/**
 * Defines the routes for the Angular application.
 */
export const appRoutes: Routes = [
    /**
     * A route that displays the users table.
     *
     * @route
     * @path /users
     * @component {UsersTableComponent} The component displayed when navigating to the `/users` path.
     *
     * @example
     * // Navigate to the users table
     * this.router.navigate(['/users']);
     */
    { path: 'users', component: UsersTableComponent },

    /**
     * The default route that redirects to `/users`.
     *
     * @route
     * @path /
     * @redirect {string} Redirects to `/users` with a full path match.
     *
     * @example
     * // Default behavior on app startup
     * // Redirects to the users table
     */
    { path: '', redirectTo: '/users', pathMatch: 'full' },
];

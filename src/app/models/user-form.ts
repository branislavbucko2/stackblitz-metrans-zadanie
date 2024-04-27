import { FormControl } from '@angular/forms';
import { User } from './user';

/**
 * A generic utility type for creating a FormGroup with specific form controls.
 *
 * This type maps each property in a given type `T` to a FormControl
 * that can hold the same type of value or `null`.
 *
 * @template T - The type of the data structure to map to form controls.
 */
export type FormGroupType<T> = {
    [K in keyof T]: FormControl<T[K] | null>;
};

/**
 * A specific form group type for user-related data.
 *
 * This type maps the properties of the `User` interface to form controls,
 * allowing the creation of Reactive Forms for user data.
 */
export type UserFormGroupType = FormGroupType<User>;
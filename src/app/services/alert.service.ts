import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A service for displaying alert messages using Angular Material's MatSnackBar.
 */
@Injectable({
    providedIn: 'root', // Makes the service globally available
})
export class AlertService {
    constructor(private snackBar: MatSnackBar) {}

    /**
     * Displays an alert message using MatSnackBar.
     *
     * @param {string} message - The alert message to display.
     * @param {string} [className] - Optional class for styling the snackbar.
     * @param {string} [action='Close'] - The text for the action button.
     * @param {number} [duration=4000] - Duration (in milliseconds) to display the alert.
     *
     * @example
     * // Display a simple alert
     * this.alertService.showAlert('This is an alert message!');
     *
     * @example
     * // Display an alert with a custom class
     * this.alertService.showAlert('Custom alert', 'custom-snackbar');
     */
    public showAlert(
        message: string,
        className?: string,
        action: string = 'Close',
        duration: number = 4000
    ): void {
        this.snackBar.open(message, action, {
            duration,
            panelClass: className,
        });
    }
}

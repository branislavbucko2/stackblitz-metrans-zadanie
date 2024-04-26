import {Component, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import 'zone.js';
import {provideRouter, RouterOutlet} from "@angular/router";
import {appRoutes} from "./app/app-routes";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <router-outlet></router-outlet>
    `,
    imports: [
        RouterOutlet
    ]
})
export class App {
    name = 'Angular';
}

bootstrapApplication(App, {
    providers: [
        provideRouter(appRoutes),
        provideAnimationsAsync(),
        importProvidersFrom(HttpClientModule)
    ]
});

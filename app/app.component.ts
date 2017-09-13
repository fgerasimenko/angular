import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>Bem-Vindo!</h1>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    constructor(public navCtrl: NavController, private authProvider: AuthProvider) {
    }

    login() {
        this.authProvider.login().then((user) => console.log(user));
    }

    logout() {
        this.authProvider.logout().then(() => {});
    }
}

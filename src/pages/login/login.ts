import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {User} from "../../shared/interfaces/user";
import {HomePage} from "../home/home";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    user: User = {email: '', password: ''};

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private authProvider: AuthProvider) {
    }

    login(user: User) {
        this.authProvider.login(user)
            .then((loggedUser) => loggedUser ? this.navCtrl.setRoot(HomePage) : this.invalidUser());
    }

    logout() {
        this.authProvider.logout();
    }

    invalidUser() {
        let toast = this.toastCtrl.create({
            message: 'Usuário/Senha incorretos.',
            duration: 3000
        });
        toast.present();
    }
}

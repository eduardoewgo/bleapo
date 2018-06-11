import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private authProvider: AuthProvider) {

    }

    ionViewCanEnter() {
        return this.authProvider.authenticated();
    }
}

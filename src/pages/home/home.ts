import {Component} from '@angular/core';
import {Loading, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Home} from "../../shared/interfaces/home";
import {Observable} from 'rxjs';
import {HomeProvider} from "../../providers/home/home";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    loader: Loading;
    homes: Observable<Home[]>;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
                private authProvider: AuthProvider, private homeProvider: HomeProvider) {

        this.presentLoading().then(() => {
            this.homes = this.homeProvider.getAll();
            this.homes.subscribe((data) => this.loader.dismiss());
        });
    }

    presentLoading(): Promise<any> {
        this.loader = this.loadingCtrl.create({
            content: "Carregando..."
        });
        return this.loader.present();
    }

    futureFeature() {
        let toast = this.toastCtrl.create({
            message: 'Recurso em desenvolvimento.',
            duration: 3000
        });
        toast.present();
    }

    ionViewCanEnter() {
        return this.authProvider.authenticated();
    }
}

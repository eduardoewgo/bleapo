import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Patient} from "../../shared/interfaces/patient";
import {Home} from "../../shared/interfaces/home";
import {PatientProvider} from "../../providers/patient/patient";
import {Observable} from "rxjs/index";
import {Status} from "../../shared/interfaces/status";

@IonicPage()
@Component({
    selector: 'page-patient',
    templateUrl: 'patient.html',
})
export class PatientPage {

    imgs: string[] = ['assets/imgs/oldma1.jpg', 'assets/imgs/oldma2.jpg'];
    img: string = this.imgPath();

    loader: Loading;
    home: Home;
    patient: Patient;
    status: Observable<Status[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
                private patientProvider: PatientProvider) {

        this.home = this.navParams.get('home');
        this.patient = this.navParams.get('patient');
        this.presentLoading().then(() => {
            this.status = this.patientProvider.getAllBpm(this.home.id, this.patient.id);
            this.status.subscribe((data) => this.loader.dismiss());
        });
    }

    imgPath(): string {
        return this.imgs[Math.floor(Math.random() * this.imgs.length)];
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

}

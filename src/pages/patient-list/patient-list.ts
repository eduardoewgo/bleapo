import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Home} from "../../shared/interfaces/home";
import {PatientProvider} from "../../providers/patient/patient";
import {Observable} from "rxjs/index";
import {Patient} from "../../shared/interfaces/patient";
import {PatientPage} from "../patient/patient";

@IonicPage()
@Component({
    selector: 'page-patient-list',
    templateUrl: 'patient-list.html',
})
export class PatientListPage {

    loader: Loading;
    home: Home;

    patients: Observable<Patient[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
                private patientProvider: PatientProvider) {

        this.home = this.navParams.get('home');
        this.presentLoading().then(() => {
            this.patients = this.patientProvider.getAll(this.home.id);
            this.patients.subscribe((data) => this.loader.dismiss());
        });
    }

    goTo(page: string, patient: Patient) {
        switch (page) {
            case 'patient-pulse':
                this.navCtrl.push(PatientPage, {home: this.home, patient});
                break;
            default:
                console.warn('switch condition failed');
        }
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

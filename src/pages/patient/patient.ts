import {Component, ViewChild} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Patient} from "../../shared/interfaces/patient";
import {Home} from "../../shared/interfaces/home";
import {PatientProvider} from "../../providers/patient/patient";
import {Observable} from "rxjs/index";
import {Status} from "../../shared/interfaces/status";
import {Chart} from 'chart.js';

import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-patient',
    templateUrl: 'patient.html',
})
export class PatientPage {

    @ViewChild('lineCanvas') lineCanvas;
    lineChart;

    imgs: string[] = ['assets/imgs/oldma1.jpg', 'assets/imgs/oldma2.jpg'];
    img: string = this.imgPath();

    loader: Loading;
    home: Home;
    patient: Patient;
    status: Observable<Status[]> = new Observable<Status[]>();

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
                private patientProvider: PatientProvider) {

        this.home = this.navParams.get('home');
        this.patient = this.navParams.get('patient');
        this.presentLoading().then(() => {
            this.status = this.patientProvider.getAllBpm(this.home.id, this.patient.id);
            this.status.subscribe((data) => {
                this.drawChart(data);
                this.loader.dismiss();
            });
        });
    }

    drawChart(data: Status[]) {
        /* could'nt get timestamp, so here's some fake data */
        data = data.map((e) => {
            e.createTime = moment().toDate();
            return e;
        });
        data = data.map((e, i, arr) => {
            e.createTime = !arr[i - 1] ? e.createTime = moment(e.createTime).toDate() : moment(arr[i - 1].createTime).add(10, 's').toDate();
            return e;
        });

        /* create element if it is the first time running */
        if (!this.lineChart) {
            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: data.map((e) => moment(e.createTime).format('mm:ss').toString()),
                    datasets: [
                        {
                            label: "Pulso",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "#ff3647",
                            borderColor: "#ff3647",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "#ff3647",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "#ff3647",
                            pointHoverBorderColor: "#ff3647",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data.map((e) => e.batimentos),
                            spanGaps: false,
                        }
                    ]
                }
            });
        } else {
            this.lineChart.data.labels = data.map(() => moment().format('mm:ss').toString());
            this.lineChart.data.datasets[0].data = data.map(e => e.batimentos);
            this.lineChart.update();
        }
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

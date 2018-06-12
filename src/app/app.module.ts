import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {firestore} from "../environments/firestore";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

/* Providers */
import {AuthProvider} from '../providers/auth/auth';
import {PatientProvider} from '../providers/patient/patient';
import {HomeProvider} from '../providers/home/home';

/* Pages */
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {PatientListPage} from "../pages/patient-list/patient-list";
import {PatientPage} from "../pages/patient/patient";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        PatientListPage,
        PatientPage

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firestore),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        PatientListPage,
        PatientPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        HomeProvider,
        PatientProvider
    ]
})
export class AppModule {
}

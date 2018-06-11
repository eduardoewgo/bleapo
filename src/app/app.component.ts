import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform) {
        this.initializeApp();

        this.pages = [
            {title: 'Home', component: HomePage}
        ];

    }

    initializeApp() {
        /* Our app will be PWA first, so there's no need to call platform neither plugins.
        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });*/
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}

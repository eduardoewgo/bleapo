import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../shared/interfaces/user";

@Injectable()
export class AuthProvider {

    user: User;

    constructor(private afAuth: AngularFireAuth) {
    }

    login(): Promise<User> {
        return this.afAuth.auth.signInWithEmailAndPassword('jao@gmail.com', '123456')
            .then((data) => this.user = {...data.user})
            .catch((err: { code: string, message: string }) => console.warn(err));
    }

    logout(): Promise<User> {
        return this.afAuth.auth.signOut()
            .then(() => this.user = null)
            .catch((err) => console.warn(err));
    }

    authenticated(): boolean {
        return !!this.user;
    }
}

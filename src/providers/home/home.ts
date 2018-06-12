import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Home} from "../../shared/interfaces/home";
import {map} from "rxjs/operators";

@Injectable()
export class HomeProvider {

    homesCollection: AngularFirestoreCollection<Home>;

    constructor(private afs: AngularFirestore) {
    }

    getAll() {
        this.homesCollection = this.afs.collection('homes', ref => ref.orderBy('name'));
        return this.homesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Home;
                const id = a.payload.doc.id;
                return {id, ...data};
            })));
    }

}

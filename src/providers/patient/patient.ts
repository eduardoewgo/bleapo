import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Patient} from "../../shared/interfaces/patient";
import {map} from "rxjs/operators";

@Injectable()
export class PatientProvider {

    patientsCollection: AngularFirestoreCollection<Patient>;

    constructor(private afs: AngularFirestore) {
    }

    getAllByHome(idHome: string) {
        this.patientsCollection = this.afs.collection('homes').doc(idHome).collection('patients', ref => ref.orderBy('name'));
        return this.patientsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Patient;
                const id = a.payload.doc.id;
                return {id, ...data};
            })));
    }

}

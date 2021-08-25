import { error } from '@angular/compiler/src/util';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { CarAttributes } from './create/create.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  getAdds() {
    return this.afs.collection('adds').snapshotChanges();
  }

  createAdd(carAdd: CarAttributes) {
    return new Promise((resolve, reject) => {
      this.afs.collection('adds').add(carAdd)
        .then(() => resolve(true))
        .catch(error => {
          console.log(error);
          reject(false);
        });
    });
  }

  updateAdd(carAdd: CarAttributes) {
    return new Promise((resolve, reject) => {
      delete carAdd.uid;
      this.afs.doc('adds/' + carAdd.uid).update(carAdd)
        .then(() => resolve(true))
        .catch(error => {
          console.log(error);
          reject(false);
        });
    });
  }

  deleteAdd(addId: string) {
    return new Promise((resolve, reject) => {
      this.afs.doc('adds/' + addId).delete()
        .then(() => resolve(true))
        .catch(error => {
          console.log(error);
          reject(false);
        });
    });
  }
}

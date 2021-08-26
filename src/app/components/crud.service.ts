import { error } from '@angular/compiler/src/util';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from "@angular/router";
import { CarAttributes } from './create/create.component';
import { from, Observable } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private basePath = '/images';

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private router: Router,
    private ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  bulkPushFilesToStarage(files: File[]): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      const promises = Array<Promise<string>>();
      files.forEach(file => promises.push(this.pushFileToStorage(file)));

      Promise.all(promises)
        .then(results => {
          resolve(results);
        })
        .catch(error => {
          console.log(error);
          reject(false);
        })
    });
  }

  pushFileToStorage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `${this.basePath}`;
      const storageRef = this.storage.ref(filePath);
      const fileRef = storageRef.child(`${filePath}/${file.name}`);
      fileRef.put(file).then((res: any) => {
        res.ref.getDownloadURL().then((fileUrl: string) => {
          resolve(fileUrl);
        });
      });
    });
  }

  uploadFileAndGetMetadata(
    fileToUpload: File,
  ): any {
    return new Promise((resolve, reject) => {
      const { name } = fileToUpload;
      const filePath = `${this.basePath}/${new Date().getTime()}_${name}`;
      const fileRef = this.storage.ref(filePath);
      fileRef.put(fileToUpload).then((res: any) => {
        res.ref.getDownloadURL().then((fileUrl: string) => {
          resolve(fileUrl);
        });
      });
    })
  }

  getSingleAdd(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await this.afs.collection('adds').doc(id).ref.get();
        // const data = snapshot.data();
        if (doc.exists) {
          // console.log(doc.data());
          resolve(doc.data())
        } else {
          resolve(false);
        }
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  }

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

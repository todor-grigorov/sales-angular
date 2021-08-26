import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from "@angular/router";
import { CarAttributes } from './create/create.component';
import { from, Observable } from 'rxjs';
import { switchMap, finalize, map } from 'rxjs/operators';
import { SearchAttributes } from './search/search.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private basePath = '/images';

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
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

  updateAdd(carAdd: CarAttributes, id: string) {
    return new Promise((resolve, reject) => {
      // delete carAdd.uid;
      const docRef = this.afs.collection('adds').doc(id);
      docRef.update(carAdd)
        .then(() => resolve(true))
        .catch(error => {
          console.log(error);
          reject(false);
        });
      // this.afs.doc('adds/' + carAdd.uid).update(carAdd)
      //   .then(() => resolve(true))
      //   .catch(error => {
      //     console.log(error);
      //     reject(false);
      //   });
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

  async onSearch(formValues: SearchAttributes): Promise<Array<CarAttributes>> {
    return new Promise((resolve, reject) => {
      Object.keys(formValues).forEach(key => {
        let el = formValues[key];

        if (!el) {
          delete formValues[key];
        }
      });
      this.afs.collection("adds").snapshotChanges().pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })).subscribe((querySnapshot) => {

          const res = querySnapshot.filter(function (doc: { [key: string]: string | number | boolean | Array<string> | undefined }) {
            let isValid = true;
            for (let i = 0; i < Object.keys(formValues).length; i++) {
              const formKey = Object.keys(formValues)[i];
              for (let j = 0; j < Object.keys(doc).length; j++) {
                const docKey = Object.keys(doc)[j];
                if (docKey === formKey) {
                  if (doc[docKey] !== formValues[formKey]) {
                    isValid = false;
                    break;
                  }
                }
              }
            }

            return isValid;
          });

          resolve(res);
        });
    })
  }

  getUserAdds(uid: string): Promise<Array<CarAttributes>> {
    return new Promise((resolve, reject) => {
      this.afs.collection("adds", ref => ref.where("uid", "==", uid)).snapshotChanges().pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })).subscribe((querySnapshot) => {
          console.log(querySnapshot)
          resolve(querySnapshot);
        });
    });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private firestore: AngularFirestore,
    private readonly snackBar: MatSnackBar,
  ) {}

  updateData(data:any, uid:string, adds:any){
      const query=this.firestore.collection('Members').doc(uid).set({
        alamat:Object.assign({}, data.alamat),
        kontak:Object.assign({}, data.kontak),
        aparatur:Object.assign({}, data.aparatur),
        administrasi:Object.assign({},data.administrasi),
        adds:Object.assign({},adds),
        }, {merge:true});

        if(query){
          this.openSnackBar('Data Berhasil di Update !!', 'OK');
        }
  }

  getData(uid:string){
    return this.firestore.collection('Members').doc(uid).get();
  }

  openSnackBar(message:string, action:string) {
    this.snackBar.open(message, action, {
    duration: 2500,
  })
}

}

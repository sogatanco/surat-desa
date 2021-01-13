import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SuratService {

  constructor(
    private firestore:AngularFirestore
  ) { }

  getAllSurats(){
    return this.firestore.collection('Surats').snapshotChanges();
   }

   getSurat(kode:string){
     return this.firestore.collection('Surats').doc(kode).valueChanges();
   }

}

import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class PaketService {

  constructor(
    private firestore: AngularFirestore
  ) {}

   getPaket(){
    return this.firestore.collection('paket').snapshotChanges();
   }

}

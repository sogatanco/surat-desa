import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MasyarakatService {

  constructor(
    private firestore:AngularFirestore,
  ) { }

  getMasyarakat(idDesa:string){
    return this.firestore.collection('Masyarakat', ref=>ref.where('inputBy','==', idDesa)).snapshotChanges();
  }
}

import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router:Router,
    private firestore: AngularFirestore,
    private readonly snackBar: MatSnackBar,
  ) {
    this.userData = angularFireAuth.authState;
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
    this.openSnackBar('You are Logged Succesfully !', 'OK');
    this.isAuth();
    })
    .catch(err => {
    this.openSnackBar(err.message, 'OK');
    });
  }

  SignOut() {
    this.angularFireAuth
    .signOut();
  }

  isNoAuth(){
    this.userData.subscribe(user=>{
      if(!user){
        this.router.navigate(['login']);
      }
      this.isNoVerifiedEmail()
    });
  }

  isAuth(){
    this.userData.subscribe(user=>{
      if(user){
        this.router.navigate(['member']);
      }
    });
  }

  SignUp(email: string, password: string, paket:string) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.firestore.collection('Members').doc(res.user.uid).set({
        email:email,
        password:password,
        paket:paket
      });
      this.SendVerificationMail();
      this.openSnackBar('Register akun baru berhasil', 'OK');
      this.isAuth();
    })
    .catch(error => {
      this.openSnackBar(error.message, 'OK');
    });
  }

  SendVerificationMail() {
    return this.userData.subscribe(user=>{
      if(user.emailVerified==true){
        this.openSnackBar('Email sudah terverifikasi', 'OK');
      }else{
        user.sendEmailVerification().then(res=>{
          this.openSnackBar('Email verifikasi baru saja dikirim ,  cek kotak masuk email sekarang!', 'OK');
        })
        .catch(err => {
          this.openSnackBar(err.message, 'OK');
        });
      }
      
    })
  }

  openSnackBar(message:string, action:string) {
      this.snackBar.open(message, action, {
      duration: 2500,
    })
  }

  isNoVerifiedEmail(){
    this.userData.subscribe(user=>{
      if(user.emailVerified==false){
        this.router.navigate(['member/verification']);
      }
    })
  }

  isVerifiedEmail(){
    this.userData.subscribe(user=>{
      if(user.emailVerified==true){
        this.router.navigate(['member']);
      }
    })
  }

}

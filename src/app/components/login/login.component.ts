import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    paket: new FormControl('365hr'),
  });

  constructor(
    public authService: AuthService,
    
  ) { }


  signIn(email: string, password: string) {
    this.authService.SignIn(email, password);
    }

  signUp(){
    this.authService.SignUp(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.paket);
  }

  ngOnInit(): void {
    this.authService.isAuth();
  }

  

// openSnackBar('sdgsdgsdg', 'gsdgsdg')
}

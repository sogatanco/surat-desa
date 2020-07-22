import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) { }

  signOut(){
    this.authService.SignOut();
  }

  ngOnInit(): void {
    this.authService.isNoAuth();
  }


}

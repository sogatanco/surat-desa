import { Component, OnInit,  ElementRef} from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private el: ElementRef
  ) { }

  signOut(){
    this.authService.SignOut();
  }

  ngOnInit(): void {
    this.authService.isNoAuth();
  }

  closeSidebar(){
    let myTag = this.el.nativeElement.querySelector('.page-wrapper');
    myTag.classList.remove('toggled')
  }
  showSidebar(){
    let myTag = this.el.nativeElement.querySelector('.page-wrapper');
    myTag.classList.add('toggled')
  }

}

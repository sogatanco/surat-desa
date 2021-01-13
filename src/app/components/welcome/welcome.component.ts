import { Component, OnInit } from '@angular/core';
import {PaketService} from '../../services/paket.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 pakets: any;
  constructor(
    private paketService: PaketService
  ) { }

  ngOnInit() {
    this.paketService.getPaket().subscribe(data => {

      this.pakets = data.map(e => {
        return {
          id: e.payload.doc.id,
          namaPaket: e.payload.doc.data()['namaPaket'],
          masaBerlaku: e.payload.doc.data()['masaBerlaku'],
          hargaPaket: e.payload.doc.data()['hargaPaket'],
        };
      })
      // console.log(this.pakets);
    });
  }
}




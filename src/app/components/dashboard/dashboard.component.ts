import { Component, OnInit } from '@angular/core';
import {SuratService} from '../../services/surat.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  surats:any;

  constructor(
    private surat:SuratService
  ) { }

  ngOnInit(): void {
    this.surat.getAllSurats().subscribe(data=>{
      this.surats=data.map(e=>{
        return{
          kode:e.payload.doc.id,
          nama:e.payload.doc.data()['namaSurat']
        }
      })
    })
    
  }


}

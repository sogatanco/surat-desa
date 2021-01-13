import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SuratService} from '../../services/surat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MasyarakatService} from '../../services/masyarakat.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-create-surat',
  templateUrl: './create-surat.component.html',
  styleUrls: ['./create-surat.component.css']
})
export class CreateSuratComponent implements OnInit {

  addNew:boolean;
  dataSurat:any;
  suratForm:FormGroup;
  options:any;
  filteredOptions: Observable<any[]>;
  nama = new FormControl();

  constructor( 
    private route: ActivatedRoute,
    private suratService: SuratService,
    private masyarakat:MasyarakatService,
    private auth:AuthService,
    ) { }

  ngOnInit(): void {
    this.addNew=true;
    this.route.params.subscribe(param=>{

      this.suratService.getSurat(param.kode).subscribe((data)=>{
        this.dataSurat=data;


        this.auth.userData.subscribe(user=>{
          this.masyarakat.getMasyarakat(user.uid).subscribe(m=>{

            this.options=m.map(i=>{
              return{
                nik:i.payload.doc.data()['nik'],
                nama:i.payload.doc.data()['nama']
              }
            })

            this.filteredOptions = this.nama.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );

          })
        })


      })

    })

  }

  changeInput(obj){
    if(obj!=='' && this._filter(obj).length<=0){
      this.addNew=false;
    }else{
      this.addNew=true;
    }
  }

  onSubmit(){
    console.log(this.suratForm.value)
  }

  getVal(value:string){
    console.log(value)
  }

  trackByFunction(index:number, option:any):string{
    if(!option) return null;
    return option.nik;
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.nama.toLowerCase().includes(filterValue));
  }

}

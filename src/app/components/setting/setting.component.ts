import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {SettingService} from '../../services/setting.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  submitted = false;

  settingForm = new FormGroup({
    alamat:new FormGroup({
      jalan: new FormControl('', [Validators.required]),
      provinsi: new FormControl('', [Validators.required]),
      kabupaten: new FormControl('', [Validators.required]),
      kecamatan: new FormControl('', [Validators.required]),
      desa: new FormControl('', [Validators.required]),
      sebutanDesa: new FormControl('', [Validators.required]),
      kodepos: new FormControl('', [Validators.required]),
    }),
    kontak:new FormGroup({
      telepon:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required, Validators.email]),
    }),
    aparatur:new FormGroup({
      sebutanKades:new FormControl('', [Validators.required]),
      namaKades:new FormControl('', [Validators.required]),
      namaCamat:new FormControl('', [Validators.required]),
      sekdes:new FormControl('', [Validators.required]),
    }),
    administrasi:new FormGroup({
      kodeDesa:new FormControl('', [Validators.required]),
      nomorSurat:new FormControl('', [Validators.required]),
    })
  });

  dataprovinsi: any;
  datakabupaten:any;
  datakecamatan:any;
  datadesa:any;

  constructor(
    private api:ApiService,
    private setting:SettingService,
    private auth:AuthService,
  ) { }

  ngOnInit(): void {
    this.api.getData('https://kodepos-2d475.firebaseio.com/list_propinsi.json').subscribe(data=>{
      this.dataprovinsi= Object.keys(data).map(e=>{
        return{
          id:e,
          namaprovinsi:data[e]
        };
      });
    });

    this.getNew()
  }

  getNew(){
    this.auth.userData.subscribe(user=>{
      this.setting.getData(user.uid).subscribe(res=>{
          if(res){
            const form=this.settingForm;
            const result=res.data();
            // alamat
            form.get('alamat.jalan').setValue(result['alamat'].jalan)
            form.get('alamat.sebutanDesa').setValue(result['alamat'].sebutanDesa)
            form.get('alamat.kodepos').setValue(result['alamat'].kodepos)

            form.get('alamat.provinsi').setValue(result['alamat'].provinsi)
            this.onProvinsiSelect(result['adds'].kodeprov)

            form.get('alamat.kabupaten').setValue(result['alamat'].kabupaten)
            this.onKabupatenSelect(result['adds'].kodekab)

            form.get('alamat.kecamatan').setValue(result['alamat'].kecamatan)
            this.onKecamatanSelect(result['alamat'].kecamatan, result['adds'].kodekab)

            form.get('alamat.desa').setValue(result['alamat'].desa)

            // kontak
            form.get('kontak.telepon').setValue(result['kontak'].telepon)
            form.get('kontak.email').setValue(result['kontak'].email)

            // aparatur
            form.get('aparatur.sebutanKades').setValue(result['aparatur'].sebutanKades)
            form.get('aparatur.namaKades').setValue(result['aparatur'].namaKades)
            form.get('aparatur.namaCamat').setValue(result['aparatur'].namaCamat)
            form.get('aparatur.sekdes').setValue(result['aparatur'].sekdes)

            // administrasi
            form.get('administrasi.kodeDesa').setValue(result['administrasi'].kodeDesa)
            form.get('administrasi.nomorSurat').setValue(result['administrasi'].nomorSurat)

          }
      });
    })
  }

  onProvinsiSelect(value:string){
    this.settingForm.get('alamat.kabupaten').setValue('')
    this.api.getData('https://kodepos-2d475.firebaseio.com/list_kotakab/'+value+'.json').subscribe(data=>{
      this.datakabupaten=Object.keys(data).map(e=>{
        return{
          id:e,
          namakabupaten:data[e]
        };
      });
    });
  }

  onKabupatenSelect(value:string){
    this.settingForm.get('alamat.kecamatan').setValue('')
    this.api.getData('https://kodepos-2d475.firebaseio.com/kota_kab/'+value+'.json').subscribe(data=>{
      let kec=this.groupBy(data, dat=>dat.kecamatan);
      this.datakecamatan=Array.from(kec.keys());
    })
  }

  onKecamatanSelect(value:string, idkab:string){
    this.settingForm.get('alamat.desa').setValue('')
    this.api.getData('https://kodepos-2d475.firebaseio.com/kota_kab/'+idkab+'.json').subscribe(data=>{
      let kec=this.groupBy(data, dat=>dat.kecamatan);
      this.datadesa=kec.get(value)
    })
  }

  onDesaSelect(value:string){
    this.settingForm.get('alamat.kodepos').setValue(value);
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }


  onSubmit(prov:string, kab:string){
    let adds={kodeprov:prov, kodekab:kab}
    this.submitted = true;
    if(this.settingForm.invalid){
      console.log(this.settingForm)
      return;
    }else{
      this.auth.userData.subscribe(user=>{
        this.setting.updateData(this.settingForm.value, user.uid, adds);
      })
    }
  }

}

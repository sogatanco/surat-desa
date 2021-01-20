import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import {  AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MemberComponent } from './components/member/member.component';
import { SettingComponent } from './components/setting/setting.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';


import { HttpClientModule } from '@angular/common/http';
import { CreateSuratComponent } from './components/create-surat/create-surat.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddDataMasyarakatComponent } from './components/add-data-masyarakat/add-data-masyarakat.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    MemberComponent,
    SettingComponent,
    EmailVerificationComponent,
    CreateSuratComponent,
    AddDataMasyarakatComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgbModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

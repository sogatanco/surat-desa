import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MemberComponent } from './components/member/member.component';
import { SettingComponent } from './components/setting/setting.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import {CreateSuratComponent} from './components/create-surat/create-surat.component';



const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component:  WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'member', 
    component: MemberComponent,
    children:[
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component:DashboardComponent},
      { path: 'setting', component:SettingComponent},
      { path: 'verification', component:EmailVerificationComponent},
      { path: 'create/:kode', component:CreateSuratComponent},
    ]
  },
  { path: '**', component:  PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

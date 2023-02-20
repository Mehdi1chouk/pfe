import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddComponent } from './components/add/add/add.component';
import { Add1Component } from './components/add1/add1/add1.component';
import { Add2Component } from './components/add2/add2/add2.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { SignUpComponent } from './components/auth/sign_up/sign-up/sign-up.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'Add', children: [
      { path: 'Ajouter_annonce', component: Add1Component },
      { path: 'Ajouter_annonce2', component: Add2Component }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign_up', component: SignUpComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

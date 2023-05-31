import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddComponent } from './components/add/add/add.component';
import { Add1Component } from './components/add1/add1/add1.component';
import { Add2Component } from './components/add2/add2/add2.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { SignUpComponent } from './components/auth/sign_up/sign-up/sign-up.component';
import { DetailsComponent } from './components/details/details/details.component';
import { FiltredHousesComponent } from './components/FiltredHouses/filtred-houses/filtred-houses.component';
import { UserAccountComponent } from './components/UserAccount/user-account/user-account.component';
import { AdminDashboardComponent } from './components/Admin_Dashboard/admin-dashboard/admin-dashboard.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'Add', children: [
      { path: 'Ajouter_annonce', component: Add1Component },
      { path: 'Ajouter_annonce2', component: Add2Component }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign_up', component: SignUpComponent },
  { path: 'details_annonce/:id', component: DetailsComponent },
  { path: 'filtered_houses', component: FiltredHousesComponent },
  { path: 'compte', component: UserAccountComponent },
  { path: 'aa', component: AdminDashboardComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

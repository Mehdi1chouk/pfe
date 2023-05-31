import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddComponent } from './components/add/add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { Add1Component } from './components/add1/add1/add1.component';
import { Add2Component } from './components/add2/add2/add2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/auth/login/login/login.component';
import { SignUpComponent } from './components/auth/sign_up/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { DataFormService } from './services/data-form.service';
import * as mapboxgl from 'mapbox-gl';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AgmCoreModule } from '@agm/core';
import { FiltreComponent } from './components/filtre/filtre/filtre.component';
import { DatePipe } from '@angular/common';
import { FiltredHousesComponent } from './components/FiltredHouses/filtred-houses/filtred-houses.component';
import { UserAccountComponent } from './components/UserAccount/user-account/user-account.component';
import { AdminDashboardComponent } from './components/Admin_Dashboard/admin-dashboard/admin-dashboard.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AddComponent,
    Add1Component,
    Add2Component,
    LoginComponent,
    SignUpComponent,
    DetailsComponent,
    FiltreComponent,
    FiltredHousesComponent,
    UserAccountComponent,
    AdminDashboardComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,





  ],
  providers: [DataFormService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

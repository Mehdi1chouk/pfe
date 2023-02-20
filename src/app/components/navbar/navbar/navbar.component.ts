import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

//import { SignUpComponent } from '../../auth/sign_up/sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private route: Router, private dialog: MatDialog) { }


  goto_add_announcement() {
    this.route.navigate(['/Add/Ajouter_annonce'])
  }



  ngOnInit(): void {
  }

  auth() {
    this.route.navigate(['/login'])
  }
}

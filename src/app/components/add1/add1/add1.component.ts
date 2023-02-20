import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add1',
  templateUrl: './add1.component.html',
  styleUrls: ['./add1.component.css']
})
export class Add1Component {

  constructor(private route: Router) { }
  emchi() {
    this.route.navigate(['/Add/Ajouter_annonce2'])
  }

}

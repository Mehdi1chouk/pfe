import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';

export function passwordMatchValidator(control: FormGroup) {
  const password1 = control.get('password1');
  const password2 = control.get('password2');
  if (password1.value !== password2.value) {
    password2.setErrors({ passwordMismatch: true });
  } else {
    password2.setErrors(null);
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  authForm: FormGroup;

  constructor(
    private fb: FormBuilder, private route: Router,
    private RegisterService: RegisterService
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      nom: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    }, { validator: passwordMatchValidator }
    );
  }




  gotologin() {
    this.route.navigate(['/login'])
  }

  CreateAccount() {
    // check if the form is valid
    if (this.authForm.invalid) {
      return;
    }

    // get form data
    const nom = this.authForm.get('nom').value;
    const email = this.authForm.get('email').value;
    const password1 = this.authForm.get('password1').value;
    const password2 = this.authForm.get('password2').value;

    // call the register method of the RegisterService
    this.RegisterService.register(nom, email, password1, password2).subscribe(
      response => {
        console.log(response); // handle successful response
        this.route.navigate(['']);
      },
      error => {
        console.log(error); // handle error response
      }
    );


    console.log('sign-up-form : ', this.authForm.value)
  }

  get nom() {
    return this.authForm.get('nom')
  }
  get email() {
    return this.authForm.get('email')
  }
  get password1() {
    return this.authForm.get('password1')
  }
  get password2() {
    return this.authForm.get('password2')
  }


}

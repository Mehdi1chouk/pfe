import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authForm: FormGroup;
  constructor(
    private fb: FormBuilder, private route: Router, private LoginService: LoginService) { }
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, , Validators.email]],
      password: ['', Validators.required]
    });
  }

  gotosign() {
    this.route.navigate(['/sign_up'])
  }

  userFullName: string;

  login() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    this.LoginService.login(email, password).subscribe(
      (data: any) => {
        console.log('Logged', data);

        const userid = data.userId;
        const userName = data.userName;

        localStorage.setItem('userId', userid);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', userName); // Store the user name in local storage

        this.route.navigate(['/compte']); // Redirect the user to the dashboard

        console.log('Logged in successfully');
        console.log('the id of the user', userid);
        console.log('the name of the user', userName);
      },
      (error) => {
        // Show an error message to the user
        alert('Incorrect email or password. Please try again.');
      }
    );
  }
}


/*
 
  login() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
 
    this.LoginService.login(email, password).subscribe((response: LoginResponse) => {
      if (response.token) {
        // Redirect the user to the dashboard
        localStorage.setItem('token', response.token);
        this.route.navigate(['']);
        console.log('token', response)
      } else {
        // Show an error message to the user
        alert('Incorrect email or password. Please try again.');
      }
    }, error => {
      // Show an error message to the user
      alert('An error occurred. Please try again later.');
    });
  }*/

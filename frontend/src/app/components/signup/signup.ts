import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../../services/users/users';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  constructor(private userService: Users) {}

  obs = new Observable();
  signupForm!: FormGroup;
  message!: string;
  error!: string;
  router = inject(Router); //navigation to login

  onSubmit() {
    console.log(this.signupForm.value);
    this.userService.registerAdmin(this.signupForm.value).subscribe(
      (response) => {
        //redirect to login page if succesful
        console.log(response);
        //delay to read message
        this.message = response.message;
        setTimeout(() => {
          this.router.navigate(['/auth/login/admin']);
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.error = error.error.data.error;
      },
    );
    //this.signupForm.reset();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      user_name: new FormControl(null, Validators.required),
      user_email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      phone_number: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}

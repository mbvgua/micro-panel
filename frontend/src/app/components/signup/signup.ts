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
import { UserResponse } from '../../models/users.models';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  constructor(private userService: Users) {}

  signupForm!: FormGroup;
  message!: string;
  status!: string;
  router = inject(Router); //navigation to login
  ufala!: any;

  onSubmit() {
    //console.log(this.signupForm.value);
    this.userService.registerAdmin(this.signupForm.value).subscribe(
      (response: UserResponse) => {
        //console.log(response);
        this.message = response.message;
        this.status = response.status;
        //console.log('the message: ', this.message);
        //console.log('the status: ', this.status);
        setTimeout(() => {
          //redirect to login page if succesful
          this.router.navigate(['/auth/login']);
        }, 1000);
      },
      (error: any) => {
        console.log(error);
        this.message = error.data.error;
        this.status = error.status;
      },
    );
    //this.signupForm.reset();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone_number: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
}

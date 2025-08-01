import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { errorResponse } from '../../models/response.models';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  constructor(private userService: Users) {}

  router = inject(Router); //navigation to login
  signupForm!: FormGroup;
  message = signal<string>('');
  status = signal<string>('');

  onSubmit() {
    this.userService.registerAdmin(this.signupForm.value).subscribe(
      (response: UserResponse) => {
        this.message.set(response.message);
        this.status.set(response.status);
        setTimeout(() => {
          //redirect to login page if succesful
          this.router.navigate(['/auth/login']);
        }, 1500);
      },
      (error: errorResponse) => {
        console.log('An error occurred: ', error);
        this.status.set(error.error.status);
        this.message.set(error.error.message);
      },
    );
    this.signupForm.reset();
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

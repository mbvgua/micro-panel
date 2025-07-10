import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  signupForm!: FormGroup;

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
      password: new FormControl(null,Validators.required),
    });
  }

    onSubmit() {
    console.log(this.signupForm.value);
    // this.signupForm.reset()
  }
}

import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../../services/users/users';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth/auth';
import { LocalStorage } from '../../services/local-storage/local-storage';
import { UserResponse } from '../../models/users.models';

@Component({
  selector: 'app-sigin',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sigin.html',
  styleUrl: './sigin.scss',
})
export class Sigin implements OnInit {
  constructor(
    private userService: Users,
    private authService: Auth,
    private localStorageSerive: LocalStorage,
  ) {}

  signinForm!: FormGroup;
  message!: string;
  status!: string;
  router = inject(Router); //navigation to login

  onSubmit() {
    console.log(this.signinForm.value);
    this.userService.loginAdmin(this.signinForm.value).subscribe(
      (response: any) => {
        this.authService.login();

        console.log(response);
        this.message = response.message;
        if (response.data.users['role'] == 'admin') {
          //TODO: make this work
          ////delay to read message
          setTimeout(() => {
            // save critical data to local storage
            this.localStorageSerive.clear();
            this.localStorageSerive.setItem('id', response.data.users['id']);
            //NOTE:either email/username will be stored. not both
            this.localStorageSerive.setItem('username',response.data.users['username'],);
            this.localStorageSerive.setItem('email',response.data.users['email'],);
            this.localStorageSerive.setItem('role',response.data.users['role'],);

            this.router.navigate(['dashboard']);
          }, 1000);
        }
      },
      (error: any) => {
        console.log(error);
        this.message = error.data.error;
        this.status = error.status;
      },
    );
    // this.signinForm.reset()
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username_or_email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}

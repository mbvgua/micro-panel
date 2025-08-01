import { Component, inject, OnInit, signal } from '@angular/core';
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
import { errorResponse } from '../../models/response.models';

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
    private localStorageService: LocalStorage,
  ) {}

  router = inject(Router); //navigation to login
  signinForm!: FormGroup;
  message = signal<string>('');
  status = signal<string>('');

  onSubmit() {
    this.userService.loginAdmin(this.signinForm.value).subscribe(
      // you might think you want to strong type this to be a UserResponse
      // DONT. Things will break! Desructuring things to save to local storage
      // becomes a nightmare
      (response: any) => {
        this.message.set(response.message);
        this.status.set(response.status);
        console.log(response.data.users);

        if (response.data.users['role'] == 'admin') {
          setTimeout(() => {
            // save critical data to local storage
            this.localStorageService.clear();
            this.localStorageService.setItem('id', response.data.users['id']);
            //NOTE:either email/username will be stored. not both
            this.localStorageService.setItem( 'username', response.data.users['username'],);
            this.localStorageService.setItem( 'email', response.data.users['email'],);
            this.localStorageService.setItem( 'role', response.data.users['role'],);

            //login the user
            this.authService.login();
            this.router.navigate(['dashboard']);
          }, 1500);
        }
      },
      (error: errorResponse) => {
        console.log('An error occurred: ', error);
        this.status.set(error.error.status);
        this.message.set(error.error.message);
      },
    );
    this.signinForm.reset();
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username_or_email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}

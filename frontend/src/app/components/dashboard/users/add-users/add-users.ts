import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Users } from '../../../../services/users/users';
import { IUsers, UserResponse } from '../../../../models/users.models';
import { LocalStorage } from '../../../../services/local-storage/local-storage';

@Component({
  selector: 'app-add-users',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-users.html',
  styleUrl: './add-users.scss',
})
export class AddUsers implements OnInit {
  constructor(
    private userService: Users,
    private localStorageService: LocalStorage,
  ) {}
  //build the response and error vars
  message!: string;
  status!: string;
  addUserForm!: FormGroup;
  user!: {};

  // add user on submit
  addUser() {
    // define user value
    // HACK:since admin Id is gotten from local storage
    this.user = {
      admin_id: this.localStorageService.getItem('id'),
      microfinance_id: this.addUserForm.get('microfinance_id')?.value,
      firstname: this.addUserForm.get('firstname')?.value,
      lastname: this.addUserForm.get('lastname')?.value,
      username: this.addUserForm.get('username')?.value,
      email: this.addUserForm.get('email')?.value,
      phone_number: this.addUserForm.get('phone_number')?.value,
      password: this.addUserForm.get('password')?.value,
    };
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (response: UserResponse) => {
        this.status = response.status;
        this.message = response.message;
      },
      (error: any) => {
        console.log('An error occurred: ', error);
        this.message = error.error.data.error;
      },
    );
    this.addUserForm.reset;
  }

  ngOnInit(): void {
    // create the reactive form
    this.addUserForm = new FormGroup({
      microfinance_id: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', Validators.required),
    });

    this.addUser();

    this.addUserForm.valueChanges.subscribe(() => {
      this.message = '';
    });
  }
}

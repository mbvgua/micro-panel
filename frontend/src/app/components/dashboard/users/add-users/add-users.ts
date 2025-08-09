import { Component, OnInit, signal } from '@angular/core';
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
import { errorResponse } from '../../../../models/response.models';

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

  message = signal<string>('');
  status = signal<string>('');
  addUserForm!: FormGroup;
  user!: {};

  // add user on submit
  addUser() {
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

    this.userService.addUser(this.user).subscribe(
      (response: UserResponse) => {
        this.status.set(response.status);
        this.message.set(response.message);
      },
      (error: errorResponse) => {
        console.log('An error occurred: ', error);
        this.status.set(error.error.status);
        this.message.set(error.error.message);
      },
    );
    this.addUserForm.reset();
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
  }
}

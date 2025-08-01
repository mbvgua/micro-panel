import { Component, OnInit, signal } from '@angular/core';
import { Users } from '../../../../services/users/users';
import { IUsers, UserResponse } from '../../../../models/users.models';
import { LocalStorage } from '../../../../services/local-storage/local-storage';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.scss',
})
export class GetUsers implements OnInit {
  constructor(
    private usersService: Users,
    private localStorageService: LocalStorage,
  ) {}

  //signals for state mngmt
  //NOTE:worked like magic!! replicate this in all other components
  //Removes the click twice to work issue!!
  users = signal<IUsers[]>([]);
  error = signal<string>('');
  admin_id = signal<string>('');
  user_id = signal<string>('');
  updateUserForm!: FormGroup;

  //deleteUser
  deleteUser(user_id: string) {
    this.admin_id.set(this.localStorageService.getItem('id') ?? '');
    this.user_id.set(user_id);

    this.usersService.deleteUser(this.admin_id(), this.user_id()).subscribe(
      (response: UserResponse) => {
        this.users.set(response.data.users);
      },
      (error: UserResponse) => {
        console.log('An error occurred: ', error);
        this.error.set(error.message);
      },
    );
  }

  //updateUser
  updateUser(user_id: string) {
    this.user_id.set(user_id);
    console.log(this.user_id());
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (response: UserResponse) => {
        this.users.set(response.data.users);
      },
      (error: any) => {
        console.log('An error occurred: ', error);
        this.error.set(error.error.message);
      },
    );
  }
}

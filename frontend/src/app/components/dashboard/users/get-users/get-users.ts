import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../services/users/users';
import { IUsers, UserResponse } from '../../../../models/users.models';

@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.scss',
})
export class GetUsers implements OnInit {
  constructor(private usersService: Users) {}

  users: IUsers[] = [];
  error!: string;

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (response: UserResponse) => {
        this.users = response.data.users;
      },
      (error: UserResponse) => {
        console.log('An error occurred: ', error);
        this.error = error.message;
      },
    );
  }
}

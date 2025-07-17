import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers, UserResponse } from '../../models/users.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private http: HttpClient) {}
  private readonly userUrl = 'http://localhost:4000/v1/';

  //register admin
  registerAdmin(newUser: IUsers): Observable<any> {
    return this.http.post(this.userUrl + 'auth/register/admin', newUser);
  }

  //login admin
  loginAdmin(existingUser: IUsers): Observable<any> {
    return this.http.post(this.userUrl + 'auth/login/admin', existingUser);
  }

  //get users
  getUsers(): Observable<any> {
    return this.http.get(this.userUrl + 'members');
  }

  //create users
  addUser(newUser: any): Observable<any> {
    return this.http.post(this.userUrl + 'members', newUser);
  }

  //update user

  //delete users
}

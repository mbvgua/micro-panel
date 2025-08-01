import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers, UserResponse } from '../../models/users.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = 'http://localhost:4000/v1/';

  //register admin
  registerAdmin(newUser: IUsers): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/register/admin', newUser);
  }

  //login admin
  loginAdmin(existingUser: IUsers): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login/admin', existingUser);
  }

  //get users
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'members');
  }

  //create users
  addUser(newUser: any): Observable<any> {
    return this.http.post(this.baseUrl + 'members', newUser);
  }

  //update user

  //activate user
  activateUser(admin_id: string, user_id: string): Observable<any> {
    return this.http.put(this.baseUrl + `members/activate/${admin_id}`, {
      user_id,
    });
  }

  //delete users
  deleteUser(admin_id: string, user_id: string): Observable<any> {
    return this.http.put(this.baseUrl + `members/delete/${admin_id}`, {
      user_id,
    });
  }
}

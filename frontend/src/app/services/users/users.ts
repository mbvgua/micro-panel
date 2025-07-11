import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../../models/users.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {

    constructor(private http:HttpClient){}
    private readonly baseUrl = "http://localhost:4000/v1/"

    registerAdmin(newUser:Users):Observable<UserResponse>{
      return this.http.post<UserResponse>(this.baseUrl+"auth/register/admin",newUser)
    }

    loginAdmin(existingUser:Users):Observable<UserResponse>{
      return this.http.post<UserResponse>(this.baseUrl+"auth/login/admin",existingUser)
    }
  
}

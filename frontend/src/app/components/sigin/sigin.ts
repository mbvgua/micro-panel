import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../../services/users/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sigin',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './sigin.html',
  styleUrl: './sigin.scss'
})
export class Sigin implements OnInit{

  constructor(private userService:Users){}

  obs = new Observable()
  signinForm!: FormGroup;
  message!:string
  error!:string
  router=inject(Router) //navigation to login

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      userNameOrEmail: new FormControl(null, Validators.required),
      password: new FormControl(null,Validators.required),
    });
  }

    onSubmit() {
    console.log(this.signinForm.value);
    this.userService.loginAdmin(this.signinForm.value).subscribe(
      (response) => {
        console.log(response)

        if(response.data.user_role=="admin"){
          setTimeout(()=>{
            //delay to read message
            this.message = response.message

            // save critical data to local storage
            localStorage.setItem("id",response.data.id)
            localStorage.setItem("user_role",response.data.user_role)

            this.router.navigate(["/dashboard"])
        },1000)
        }
      },
      (error) =>{
        console.log(error)
        this.error = error.error.data.error
      }
    )
    // this.signinForm.reset()
  }
}

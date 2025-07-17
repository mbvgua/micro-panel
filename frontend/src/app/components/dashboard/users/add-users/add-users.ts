import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-users',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-users.html',
  styleUrl: './add-users.scss',
})
export class AddUsers {

  // create the reactive form
  addUserForm = new FormGroup({
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


  addUser(){
    console.log(this.addUserForm.value)
  }
}

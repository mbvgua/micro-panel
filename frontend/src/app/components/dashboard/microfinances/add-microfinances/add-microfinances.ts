import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-microfinances',
  imports: [ReactiveFormsModule],
  templateUrl: './add-microfinances.html',
  styleUrl: './add-microfinances.scss',
})
export class AddMicrofinances {
  // create form group instance
  addMicrofinanceForm = new FormGroup({
    reg_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    location: new FormControl('', Validators.required),
  });

  // add microfinance on submit
  addMicrofinance() {
    console.log(this.addMicrofinanceForm.value);
  }
}

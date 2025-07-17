import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Microfinances } from '../../../../services/microfinances/microfinances';
import { responseBody } from '../../../../models/response.models';

@Component({
  selector: 'app-add-microfinances',
  imports: [ReactiveFormsModule],
  templateUrl: './add-microfinances.html',
  styleUrl: './add-microfinances.scss',
})
export class AddMicrofinances implements OnInit {
  constructor(private microfinanceService: Microfinances) {}
  //build the response and error vars
  message!: string;
  status!: string;
  addMicrofinanceForm!: FormGroup;

  // add microfinance on submit
  addMicrofinance() {
    this.microfinanceService
      .createMicrofinance(this.addMicrofinanceForm.value)
      .subscribe(
        (response: responseBody) => {
          this.status = response.status;
          this.message = response.message;
        },
        (error: any) => {
          console.log('An error occurred: ', error);
          this.message = error.error.data.error;
        },
      );
    this.addMicrofinanceForm.reset;
  }

  ngOnInit(): void {
    // create form group instance
    this.addMicrofinanceForm = new FormGroup({
      reg_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      location: new FormControl('', Validators.required),
    });

    this.addMicrofinance();
    this.addMicrofinanceForm.valueChanges.subscribe(() => {
      this.message = '';
    });
  }
}

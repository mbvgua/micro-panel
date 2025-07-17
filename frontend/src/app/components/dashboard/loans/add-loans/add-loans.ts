import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-loans',
  imports: [ReactiveFormsModule],
  templateUrl: './add-loans.html',
  styleUrl: './add-loans.scss',
})
export class AddLoans {
  // create the add loan form
  addLoansForm = new FormGroup({
    microfinance_id: new FormControl('', Validators.required),
    user_id: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    interest_rate: new FormControl('', Validators.required),
    repayment_period: new FormControl('', Validators.required),
    guarantor_details: new FormGroup({
      id: new FormControl('', Validators.required),
      relationship: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
    }),
  });

  // what to do with the results
  addLoan() {
    console.log(this.addLoansForm.value);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Loans } from '../../../../services/loans/loans';
import { LocalStorage } from '../../../../services/local-storage/local-storage';
import { LoanResponse } from '../../../../models/loans.models';
import { errorResponse } from '../../../../models/response.models';

@Component({
  selector: 'app-add-loans',
  imports: [ReactiveFormsModule],
  templateUrl: './add-loans.html',
  styleUrl: './add-loans.scss',
})
export class AddLoans implements OnInit {
  constructor(
    private loanService: Loans,
    private localStorageService: LocalStorage,
  ) {}

  message = signal<string>('');
  status = signal<string>('');
  admin_id!: string;
  addLoanForm!: FormGroup;
  loan!: {};

  // add loans
  addLoan() {
    this.admin_id = this.localStorageService.getItem('id') ?? '';

    this.loan = {
      microfinance_id: this.addLoanForm.get('microfinance_id')?.value,
      user_id: this.addLoanForm.get('user_id')?.value,
      type: this.addLoanForm.get('type')?.value,
      amount: this.addLoanForm.get('amount')?.value,
      interest_rate: this.addLoanForm.get('interest_rate')?.value,
      repayment_period: this.addLoanForm.get('repayment_period')?.value,
      guarantor_details: this.addLoanForm.get('guarantor_details')?.value,
    };

    this.loanService.addLoan(this.admin_id, this.loan).subscribe(
      (response: LoanResponse) => {
        this.status.set(response.status);
        this.message.set(response.message);
      },
      (error: errorResponse) => {
        console.log('An error occurred: ', error);
        this.status.set(error.error.status);
        this.message.set(error.error.message);
      },
    );
    //reset form
    this.addLoanForm.reset()
  }

  ngOnInit(): void {
    // create the add loan form
    this.addLoanForm = new FormGroup({
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
  }
}

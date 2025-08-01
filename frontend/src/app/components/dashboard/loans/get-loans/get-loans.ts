import { Component, OnInit, signal } from '@angular/core';
import { Loans } from '../../../../services/loans/loans';
import { DetailedLoans, LoanResponse } from '../../../../models/loans.models';
import { LocalStorage } from '../../../../services/local-storage/local-storage';
import { errorResponse } from '../../../../models/response.models';

@Component({
  selector: 'app-get-loans',
  imports: [],
  templateUrl: './get-loans.html',
  styleUrl: './get-loans.scss',
})
export class GetLoans implements OnInit {
  constructor(
    private loansService: Loans,
    private localStorageService: LocalStorage,
  ) {}

  loans = signal<DetailedLoans[]>([]);
  status = signal<string>('');
  message = signal<string>('');
  admin_id = signal<string>('');
  loan_id = signal<string>('');
  updateLoanForm = signal<string>('');

  //deleteLoan
  deleteLoan(loan_id: string) {
    this.loan_id.set(loan_id);
    this.admin_id.set(this.localStorageService.getItem('id') ?? '');

    this.loansService.deleteLoan(this.admin_id(), this.loan_id()).subscribe(
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
  }

  //updateLoan
  updateLoan(loan_id: string) {
    this.loan_id.set(loan_id);
    console.log(this.loan_id());
  }

  ngOnInit(): void {
    this.loansService.getLoans().subscribe(
      (response: LoanResponse) => {
        this.loans.set(response.data.detailed_loans);
      },
      (error: errorResponse) => {
        console.log('An error occurred: ', error);
        this.status.set(error.error.status);
        this.message.set(error.error.message);
      },
    );
  }
}

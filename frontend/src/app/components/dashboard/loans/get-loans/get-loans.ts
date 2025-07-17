import { Component, OnInit } from '@angular/core';
import { Loans } from '../../../../services/loans/loans';
import {
  DetailedLoans,
  LoanResponse,
} from '../../../../models/loans.models';

@Component({
  selector: 'app-get-loans',
  imports: [],
  templateUrl: './get-loans.html',
  styleUrl: './get-loans.scss',
})
export class GetLoans implements OnInit {
  constructor(private loansService: Loans) {}

  loans: DetailedLoans[] = [];
  error!: string;

  ngOnInit(): void {
    this.loansService.getLoans().subscribe(
      (response: LoanResponse) => {
        this.loans = response.data.detailed_loans;
        console.log(this.loans)
      },
      (error: any) => {
        this.error = error.error.data;
      },
    );
  }
}

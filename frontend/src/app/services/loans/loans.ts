import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoans } from '../../models/loans.models';

@Injectable({
  providedIn: 'root',
})
export class Loans {
  private loansUrl = 'http://localhost:4000/v1/loans';

  constructor(private http: HttpClient) {}

  //create loans
  addLoan(newLoan: ILoans): Observable<any> {
    return this.http.post(this.loansUrl, newLoan);
  }

  //get loans
  getLoans(): Observable<any> {
    return this.http.get(this.loansUrl);
  }
  //update loans
  //delete loans
}

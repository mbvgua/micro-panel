import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoans } from '../../models/loans.models';

@Injectable({
  providedIn: 'root',
})
export class Loans {
  private baseUrl = 'http://localhost:4000/v1/loans';

  constructor(private http: HttpClient) {}

  //create loans
  addLoan(admin_id: string, loan_details: any): Observable<any> {
    return this.http.post(this.baseUrl + `/${admin_id}`, loan_details);
  }

  //get loans
  getLoans(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  //update loans

  //delete loans
  deleteLoan(admin_id: string, loan_id: string): Observable<any> {
    return this.http.put(this.baseUrl + `/delete/${admin_id}`, { loan_id });
  }
}

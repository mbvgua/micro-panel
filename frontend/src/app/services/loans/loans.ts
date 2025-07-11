import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoansResponse } from '../../models/loans.models';

@Injectable({
  providedIn: 'root',
})
export class Loans {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = 'http://localhost:4000/v1/loans';

  getLoans(): Observable<LoansResponse> {
    return this.http.get<LoansResponse>(this.baseUrl);
  }
}

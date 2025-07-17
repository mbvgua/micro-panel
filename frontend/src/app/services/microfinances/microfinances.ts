import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMicrofinance } from '../../models/microfinance.models';

@Injectable({
  providedIn: 'root',
})
export class Microfinances {
  private microfinanceUrl = 'http://localhost:4000/v1/microfinances';

  constructor(private http: HttpClient) {}

  //create microfinances
  createMicrofinance(microfinance: IMicrofinance): Observable<any> {
    return this.http.post(this.microfinanceUrl, microfinance);
  }

  //get microfinances
  getMicrofinances(): Observable<any> {
    return this.http.get(this.microfinanceUrl);
  }

  //update miicrofinances

  //delete microfinances
}

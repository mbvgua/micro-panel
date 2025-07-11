import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IMicrofinances,
  MicrofinanceResponse,
} from '../../models/microfinance.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Microfinances {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:4000/v1/microfinances';

  getMicrofinances(): Observable<MicrofinanceResponse> {
    return this.http.get<MicrofinanceResponse>(
      this.baseUrl,
    );
  }
}

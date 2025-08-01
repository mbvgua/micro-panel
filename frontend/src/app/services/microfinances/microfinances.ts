import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMicrofinance } from '../../models/microfinance.models';

@Injectable({
  providedIn: 'root',
})
export class Microfinances {
  private baseUrl = 'http://localhost:4000/v1/microfinances';

  constructor(private http: HttpClient) {}

  //create microfinances
  createMicrofinance(microfinance: IMicrofinance): Observable<any> {
    return this.http.post(this.baseUrl, microfinance);
  }

  //get microfinances
  getMicrofinances(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  //update microfinances

  //delete microfinances
  deleteMicrofinance( admin_id: string, microfinance_id: string): Observable<any> {
    return this.http.put(
      this.baseUrl + `/delete/${admin_id}`,
      { microfinance_id }, //made it an object for backend destructuring.else an error
    );
  }
}

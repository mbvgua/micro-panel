import { Component, OnInit } from '@angular/core';
import { Microfinances } from '../../../../services/microfinances/microfinances';
import {
  IMicrofinance,
  MicrofinanceResponse,
} from '../../../../models/microfinance.models';

@Component({
  selector: 'app-get-microfinances',
  imports: [],
  templateUrl: './get-microfinances.html',
  styleUrl: './get-microfinances.scss',
})
export class GetMicrofinances implements OnInit {
  constructor(private microfinancesService: Microfinances) {}

  microfinances: IMicrofinance[] = [];
  error!: string;

  ngOnInit() {
    this.microfinancesService.getMicrofinances().subscribe(
      (response: MicrofinanceResponse) => {
        this.microfinances = response.data.microfinances;
      },
      (error: MicrofinanceResponse) => {
        console.log('An error occurred: ', error);
        this.error = error.message;
      },
    );
  }
}

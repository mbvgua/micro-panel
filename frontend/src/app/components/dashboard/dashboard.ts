import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { Users } from '../../services/users/users';
import { Microfinances } from '../../services/microfinances/microfinances';
import { Loans } from '../../services/loans/loans';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsers } from '../../models/users.models';
import { ILoans } from '../../models/loans.models';
import {
  IMicrofinance,
  IMicrofinances,
} from '../../models/microfinance.models';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(
    private userService: Users,
    private microfinanceService: Microfinances,
    private loansService: Loans,
    public auth:Auth
  ) {}

  obs = new Observable();
  router = inject(Router);
  usersList: IUsers[] = [];
  loansList: ILoans[] = [];
  microfinanceList: IMicrofinance[] = [];
  error!: string;

  getMicrofinances() {
    console.log('get all microfinances');
    //this.microfinanceService.getMicrofinances().subscribe(
    //  (response) => {
    //    this.microfinanceList = response.data;
    //    console.log(this.microfinanceList);
    //  },
    //  (error) => {
    //    this.error = error.error.data.error;
    //  },
    //);
  }

  getLoans() {
    console.log('get all loans');
    //this.loansService.getLoans().subscribe(
    //  (response) => {
    //    this.loansList = response.data
    //    console.log(this.loansList)
    //  },
    //  (error)=>{
    //    this.error = error.error.data.error
    //  }
    //)
  }

  getMembers() {
    console.log('get all members from db');
    //this.membersService.getMembers().subscribe(
    //  (response) =>{
    //    this.membersService = response.data
    //    console.log(this.)
    //  },
    //  (error) =>{
    //    this.error = error.error.data.error
    //  }
    //)
  }

  ngOnInit(): void {}
}

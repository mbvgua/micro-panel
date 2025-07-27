import { Component, OnInit } from '@angular/core';
import { Microfinances } from '../../../../services/microfinances/microfinances';
import {
  IMicrofinance,
  MicrofinanceResponse,
} from '../../../../models/microfinance.models';
import { LocalStorage } from '../../../../services/local-storage/local-storage';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-get-microfinances',
  imports: [ReactiveFormsModule],
  templateUrl: './get-microfinances.html',
  styleUrl: './get-microfinances.scss',
})
export class GetMicrofinances implements OnInit {
  constructor(
    private microfinancesService: Microfinances,
    private localStorageService: LocalStorage,
  ) {}

  microfinances: IMicrofinance[] = [];
  error!: string;
  admin_id!: string;
  microfinance_id!: string;
  updateMicrofinanceForm!: FormGroup;

  //method to deleteMicrofinance
  deleteMicrofinance(microfinance_id: string) {
    //assign it as null if value not in local storage
    this.admin_id = this.localStorageService.getItem('id') ?? '';
    this.microfinance_id = microfinance_id;

    this.microfinancesService
      .deleteMicrofinance(this.admin_id, this.microfinance_id)
      .subscribe(
        (response: MicrofinanceResponse) => {
          this.microfinances = response.data.microfinances;
        },
        (error: MicrofinanceResponse) => {
          console.log('An error occurred: ', error);
          this.error = error.message;
        },
      );
  }

  //method to updateMicrofinance
  updateMicrofinance(microfinance_id: string) {
    this.microfinance_id = microfinance_id;

    console.log(this.updateMicrofinanceForm.value)
    //this.microfinancesService
    //  .updateMicrofinance(
    //    this.microfinance_id,
    //    this.updateMicrofinanceForm.value,
    //  )
    //  .subscribe(
    //    (response: MicrofinanceResponse) => {
    //      this.microfinances = response.data.microfinances;
    //    },
    //    (error: MicrofinanceResponse) => {
    //      this.error = error.data;
    //    },
    //  );
  }

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

    //create the update form instance grp
    this.updateMicrofinanceForm = new FormGroup({
      reg_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      location: new FormControl('', Validators.required),
    });



    //this.updateMicrofinanceForm.setValue(["name","Hussein"])
    //console.log(this.updateMicrofinanceForm.value)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sigin',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './sigin.html',
  styleUrl: './sigin.scss'
})
export class Sigin implements OnInit{
  signinForm!: FormGroup;

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      userNameOrEmail: new FormControl(null, Validators.required),
      password: new FormControl(null,Validators.required),
    });
  }

    onSubmit() {
    console.log(this.signinForm.value);
    // this.signinForm.reset()
  }
}

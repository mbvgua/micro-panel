import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit{
  year?:{}

  ngOnInit():void{
    this.year = new Date().getFullYear()
  }

}

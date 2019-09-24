import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
      this.title = "Edgar Ugueto";
      this.subtitle = "Desarrollador Web y Monje Shaolin";
      this.email = "veldraorn@gmail.com"
   }

  ngOnInit() {
  }

}

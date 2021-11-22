import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  imageURLs: String[] = ["../assets/cool_logo.jpg","../assets/solar_power.png","../assets/watering_mechanism.png"];
  constructor() { }

  ngOnInit(): void {
  }

}

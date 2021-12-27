import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  imageURLs: String[] = ["../assets/s3.png", "../assets/s2.png", "../assets/s1.png"];
  
  constructor() { }

  ngOnInit(): void {
  }

  route(url: string): void {
    window.location.href = url;
  }

}

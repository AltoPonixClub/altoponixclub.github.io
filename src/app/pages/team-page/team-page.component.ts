import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  imageURLs: String[] = ["../assets/s3.png", "../assets/s2.png", "../assets/s1.png"];
  
  constructor() { }

  ngOnInit(): void {
  }

}

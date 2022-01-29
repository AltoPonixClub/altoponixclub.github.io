import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.css']
})
export class PositionsPageComponent implements OnInit {

  //imageURLs: String[] = ["../assets/s3.png", "../assets/s2.png", "../assets/s1.png"];//electronics, etc..
  //imageCaptions: String[] = ["thing1", "thing2", "thing3"];
  carouselData: String[][] = [["../assets/s3.png","title1","desc1"],
                              ["../assets/s2.png","title2","desc2"],
                              ["../assets/s1.png","thing3","desc3"]];

  constructor() { }

  ngOnInit(): void {
  }

}

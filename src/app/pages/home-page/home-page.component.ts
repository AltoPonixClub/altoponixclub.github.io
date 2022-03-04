import { Component, OnInit } from '@angular/core';

interface Sponsor {
  description: string,
  img: string,
  url: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  imageURLs: String[] = ["../assets/s3.png", "../assets/s2.png", "../assets/s1.png"];

  sponsorOrgsGold: Sponsor[] = [
    {description: `<b>ODriveRobotics</b> produces high end, 
    high performance BLDC motor controllers, 
    used by top robotics research organizations 
    and educational institutions. They sponsor our 
    team by providing us free parts totalling hundreds of dollars, 
    making it possible for our team to use these standard industry 
    tools in our robotics solutions. <b>ODriveRobotics</b> continues to 
    drive forth innovation in the field of robotics, including 
    partnering with AltoPonix.`, img: "../assets/sponsors/odrive.png", url: "https://odriverobotics.com"},
    // {description: "hello i am a test sponsor", img: "../assets/sponsors/odrive.png", url: "https://google.com"},
  ]

  sponsorOrgsSilver: Sponsor[] = [
    // {description: "hello i am a test sponsor", img: "../assets/sponsors/odrive.png", url: "https://google.com"},
    // {description: "hello i am a test sponsor", img: "../assets/sponsors/odrive.png", url: "https://google.com"},
  ]

  sponsorOrgsGreen: Sponsor[] = [
    // {description: "hello i am a test sponsor", img: "../assets/sponsors/odrive.png", url: "https://google.com"},
    // {description: "hello i am a test sponsor", img: "../assets/sponsors/odrive.png", url: "https://google.com"},
  ]

  // sponsorIndividualsGold: String[] = ["john test"]
  // sponsorIndividualsSilver: String[] = ["john test"]
  // sponsorIndividualsGreen: String[] = ["john test"]


  sponsorIndividualsGold: String[] = []
  sponsorIndividualsSilver: String[] = []
  sponsorIndividualsGreen: String[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

  route(url: string): void {
    window.location.href = url;
  }

}

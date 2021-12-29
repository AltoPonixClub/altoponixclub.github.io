import { Component, OnInit } from '@angular/core';
import { loadScript } from "@paypal/paypal-js";

interface DonationTier {
  amount: number;
  benefits: string[];
}

@Component({
  selector: 'app-sponsor-page',
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.css']
})
export class SponsorPageComponent implements OnInit {

  tiers: DonationTier[] = [
    {
      amount: 1, 
      benefits: ["You get a free sticker!!!"]
    },
    {
      amount: 5, 
      benefits: ["You get a 2 free stickers!!!"]
    },
    {
      amount: 10, 
      benefits: ["We will ship a lettuce to your house, Personally"]
    },
    {
      amount: 50, 
      benefits: ["We will donate $2 to teamtrees"]
    },
    {
      amount: 100, 
      benefits: ["You will get a free $100","And you will also get $100 debt"]
    },
    {
      amount: 1000, 
      benefits: ["You will own Altoponix","That's it","No more"]
    },
    {
      amount: 280000000000, 
      benefits: ["elon musk"]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}

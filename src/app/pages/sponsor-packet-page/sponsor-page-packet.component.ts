import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface DonationTier {
  amount: number;
  benefits: string[];
  tier: string;
}

@Component({
  selector: 'app-sponsor-page',
  templateUrl: './sponsor-page.component.html',
  styleUrls: ['./sponsor-page.component.css']
})
export class SponsorPageComponent implements OnInit {

  tiers: DonationTier[] = [
    {
      amount: 1000, 
      benefits: [
        "Name placed most prominently on plaque on our system",
        "Name placed most prominently on donor list on our website",
        "All below benefits",
      ],
      tier: "gold"
    },
    {
      amount: 500, 
      benefits: [
        "Name placed on a plaque on our system",
        "Name on all promotional materials",
        "All below benefits",
      ],
      tier: "silver",
    },
    {
      amount: 75, 
      benefits: ["Name placed on donor list on our website"],
      tier: "green"
    },
    {
      amount: 5, 
      benefits: ["Our appreciation"],
      tier: "blue"
    },
  ]

  @ViewChild("bar") bar?: ElementRef;

  barAnimationFunc: any

  moneyAmount = 100
  displayMoney = 0
  displayMoneyRounded = 0

  constructor() { }

  ngOnInit(): void {
    this.barAnimationFunc = setInterval(() => {
      this.displayMoney = 0.2*(this.moneyAmount-this.displayMoney) + this.displayMoney
      this.displayMoneyRounded = Math.round(this.displayMoney*100)/100
      if (this.bar) {
        this.bar.nativeElement.style.width = this.moneyAmount/50 + "%"
      }
    }, 16)
  }

  ngOnDestroy(): void {
    clearInterval(this.barAnimationFunc)
  }
}

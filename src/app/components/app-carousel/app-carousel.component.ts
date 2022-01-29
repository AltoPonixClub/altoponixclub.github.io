import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './app-carousel.component.html',
  styleUrls: ['./app-carousel.component.css']
})
export class AppCarouselComponent implements OnInit {

  @Input() carouselData: String[][] = [];
  @ViewChild("positionspageCarousel") carousel?: ElementRef;
  index = 0;
  target = 0;
  lastFrame = 0;
  velo = 0;

  animationFunc: any;
  swapFunc: any;

  constructor() { }

  ngOnInit(): void {
    this.animationFunc = setInterval(() => {
      if (this.carousel) {
        this.velo -= (this.carousel.nativeElement.scrollLeft - this.target)/40
        this.velo *= 0.7
        this.carousel.nativeElement.scrollLeft += this.velo
      }
    }, 16)
    this.swapFunc = setTimeout(() => {
      this.changeImage(1)
    }, 5000)
  }

  ngOnDestroy(): void {
    clearInterval(this.animationFunc)
    clearInterval(this.swapFunc)
  }

  changeImage(x: number): void {
    clearInterval(this.swapFunc)
    this.swapFunc = setTimeout(() => {
      this.changeImage(1)
    }, 5000)
    if (this.carousel) {
      let children = this.carousel.nativeElement.children;
      let width = children[0].clientWidth;
      this.index += x + children.length;
      this.index %= children.length;
      this.target = children[this.index].offsetLeft;  
    }
  }

  @HostListener("window:resize")
  onResize(e: any): void {
    this.changeImage(0)
  }
}

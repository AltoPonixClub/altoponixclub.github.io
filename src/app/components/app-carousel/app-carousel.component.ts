import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './app-carousel.component.html',
  styleUrls: ['./app-carousel.component.css']
})
export class AppCarouselComponent implements OnInit {

  @Input() carouselImage: String[] = [];
  @ViewChild("homepageCarousel") carousel?: ElementRef;
  index = 0;
  target = 0;
  lastFrame = 0;

  animationFunc: any;

  constructor() { }

  ngOnInit(): void {
    this.animationFunc = setInterval(() => {
      if (this.carousel)
        this.carousel.nativeElement.scrollLeft = (this.carousel.nativeElement.scrollLeft - this.target)*0.8 + this.target
    }, 16)
  }

  ngOnDestroy(): void {
    clearInterval(this.animationFunc)
  }

  changeImage(x: number): void {
    if (this.carousel) {
      let children = this.carousel.nativeElement.children;
      let width = children[0].clientWidth
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

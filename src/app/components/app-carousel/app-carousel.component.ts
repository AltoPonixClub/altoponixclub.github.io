import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './app-carousel.component.html',
  styleUrls: ['./app-carousel.component.css']
})
export class AppCarouselComponent implements OnInit {

  @Input() carouselImage: String[] = [];
  @ViewChild("homepageCarousel") carousel?: ElementRef;
  index = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeImage(x: number): void {
    if (this.carousel) {
      let children = this.carousel.nativeElement.children;
      this.index += x;
      this.index %= children.length;
      children[this.index].scrollIntoView({behavior: 'smooth'});
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

    overlay: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

    toggleOverlay(): void {
        this.overlay = !this.overlay;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        if (event.target.innerWidth > 700 && !this.overlay) {
            this.overlay = true;
        }
    }

}

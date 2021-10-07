import { Component, OnInit, Output } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

    overlay: boolean = true;

    constructor(private router: Router) { }

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

    route(url: string): void {
        setTimeout(()=>{
            this.router.navigateByUrl(url);
        },250)
        console.log(url)
        this.overlay = true;
        window.location.href = url;
    }
}

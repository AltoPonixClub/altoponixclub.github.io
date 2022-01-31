import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  overlay: boolean = true;
  disablelinks: boolean = false;
  disableheader: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let path = window.location.pathname
    if (path === '/s2-webapp' || path === '/feed' || path === '/data' || path === "/login" || path === '/s2-webapp/monitors' || path === '/s2-webapp/data' || path === '/s2-webapp/stream') {
      this.disableheader = true;
    }
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
    this.overlay = true;
    window.location.href = url;
  }
}

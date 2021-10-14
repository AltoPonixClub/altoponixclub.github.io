import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redir-page',
  templateUrl: './redir-page.component.html',
  styleUrls: ['./redir-page.component.css']
})
export class RedirPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	window.location.href = window.location.href;
  }
}

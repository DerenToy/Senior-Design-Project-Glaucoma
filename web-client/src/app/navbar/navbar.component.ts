import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: string[] = ["Home", "Works", "Books", "Shelf"]
  isNavActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(): void {
    this.isNavActive = !this.isNavActive;
  }

}

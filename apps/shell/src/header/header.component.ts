import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '@smart-parking/session';

@Component({
  selector: 'app-header', // Defines the selector for this component
  imports: [CommonModule, RouterModule], // Specifies the modules to be imported for this component
  templateUrl: './header.component.html', // Path to the HTML template for this component
  styleUrl: './header.component.css', // Path to the CSS file for this component
})
export class HeaderComponentComponent implements OnInit {

  isloggedIn: boolean = false; // Tracks the login status of the user

  constructor(private sessionService: SessionService) {} // Injects the SessionService dependency

  ngOnInit(): void {
    // Subscribes to the isLogin$ observable from SessionService
    // Updates the isloggedIn property based on the emitted value
    this.sessionService.isLogin$.subscribe(res => this.isloggedIn = res);
  }

  get homeUrl() {
    // Returns the appropriate home URL based on the user's login status
    return this.isloggedIn ? 'main_portal' : '/';
  }

}
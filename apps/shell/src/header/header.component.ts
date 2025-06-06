import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '@smart-parking/session';

@Component({
  selector: 'app-header', // Defines the selector for this component
  imports: [CommonModule, RouterModule], // Specifies the modules to be imported for this component
  templateUrl: './header.component.html', // Path to the HTML template for this component
  styleUrl: './header.component.css', // Path to the CSS file for this component
})
export class HeaderComponentComponent implements OnInit {

  isloggedIn = false; // Tracks the login status of the user

  constructor(private sessionService: SessionService, private router: Router) {} // Injects the SessionService dependency

  ngOnInit(): void {
    this.sessionService.isLogin$.subscribe((res) => this.isloggedIn = res);
  }

  get homeUrl() {
    // Returns the appropriate home URL based on the user's login status
    return this.isloggedIn ? 'main_portal' : '/';
  }

  signOut(event: Event): void {
    event.preventDefault();
    this.sessionService.logOut();
    this.router.navigate(['/login']);
  }

 }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '@smart-parking/session';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponentComponent implements OnInit {

  isloggedIn: boolean = false;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.isLogin$.subscribe(res=>this.isloggedIn = res);
  }

}

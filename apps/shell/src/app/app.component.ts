import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponentComponent } from '../header/header.component';
import { SessionService } from '@smart-parking/session';
import { Subscription } from 'rxjs';

@Component({
  imports: [RouterModule, HeaderComponentComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'shell';
  subscription: Subscription;

  constructor(private router: Router, private sessionService: SessionService) {
    this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if(!router.navigated) {
            this.sessionService.checkLoginSession();
          }
        }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

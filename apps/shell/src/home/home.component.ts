import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  infoCardsLeft: any[] = [
    {
      title: 'IOT enabled car parking',
      description: 'connected IOT enabled smart car parking solution. Parking information flows through the connected network of sub-system.',
      imgSrc: ''
    },
    {
      title: 'Sensors talk the state',
      description: 'smart sensor solution helps in commounicating the current state and provides seamless parking slots visibility to all stakeholders.',
      imgSrc: ''
    },
    {
      title: 'Hassle free registration',
      description: 'easy registration process for the public and interactive smart parking portal for blocking the parking slot ahead of time.',
      imgSrc: ''
    }
  ];

  infoCardsRight: any[] = [
    {
      title: 'Integrated Payment',
      description: 'Portal includes integrated payment gateway for quick and no wait payments with automatic pay per use payment solution.',
      imgSrc: ''
    }
  ]
}

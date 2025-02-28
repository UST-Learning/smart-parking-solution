import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `
    <section class="flex flex-col justify-between font-['Fort,serif'] font-light w-full h-full">
      <article class="bg-[#006e74] text-white p-8">
        <p class="font-bold"> Who we are </p>
        <p class="text-5xl my-4">Digital is our DNA</p>
        <p class="my-4">We’re listeners and leaders, working together to take on tomorrow’s challenges.</p>
        <img class="relative z-10 w-1/3 justify-self-end top-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NRQyq-7mbydI3ZZJ4NtC151rDc7kZccKrQ&s" alt="UST Partner for Business Transformation">
      </article>
      <article class="my-8 p-4 font-light">
        <p class="font-bold">OUR CORE VALUES</p>
        <h3 class="text-3xl font-extrabold">What we believe</h3>
        <p>We’re proud to embrace the same values that have shaped UST since the beginning. Since day one, we’ve been building enduring relationships and a culture of integrity. And today, it's those same values that are inspiring us to encourage innovation from everyone, to champion diversity and inclusion and to place people at the center of everything we do. </p>
        <div>
        </div>
        <div class="grid grid-cols-3 gap-4 text-white mx-4 mt-8">
          <div class="p-4 bg-cyan-800 shadow-md"> 
            <p>Humility</p> 
            <p>We will listen, learn, be empathetic and help selflessly in our interactions with everyone.</p>
          </div>
          <div class="p-4 bg-cyan-800 shadow-md"> 
            <p>Humanity</p> 
            <p>Through business, we will better the lives of those less fortunate than ourselves.</p>
          </div>
          <div class="p-4 bg-cyan-800 shadow-md"> 
            <p>Integrity</p> 
            <p>We honor our commitments and act with responsibility in all our relationships.</p>
          </div>
        </div>
      </article>
    </section>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}

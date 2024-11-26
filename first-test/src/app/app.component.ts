import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompComponent } from './comp/comp.component';

@Component({
  selector: 'inline-comp',
  standalone: true,
  imports: [],
  template: `
    <h1>Inline Comp</h1>
    <button
      (click)="toggleIsLoggedIn()"
      class="rounded border border-gray-100 px-2 py-1"
    >
      Click
    </button>
    @if (isLoggedIn) {
    <h2>Logged In</h2>
    } @else {
    <h2>Logged Out</h2>
    }
  `,
})
export class InlineCompComponent {
  isLoggedIn = false;
  toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterOutlet, CompComponent, InlineCompComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'first-test';
  handleClick() {
    console.log('clicked');
  }
}

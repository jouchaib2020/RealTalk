import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp.component.html',
  template: `
    <h1>Comp</h1>
    <button [disabled]="true" (click)="click++">Click</button>
    <p>{{ txt }}</p>
  `,
})
export class CompComponent {
  txt = 1;

  clickHandler() {
    this.txt = this.txt === 1 ? 2 : 1;
  }
}

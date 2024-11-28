import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[test-directive]',
  standalone: true,
})
export class DirectiveeDirective {
  constructor() {
    console.log('constructor for test-directive');
  }
  @Input({ required: false }) test!: boolean;
}

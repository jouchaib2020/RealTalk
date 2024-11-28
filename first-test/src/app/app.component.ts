import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CompComponent } from './comp/comp.component';
import { TestInterface } from './test-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mapped-comp',
  standalone: true,
  // imports: [RouterModule],
  template: `
    <div style="display: flex; padding: 10px; margin: 10px;">
      <h4>{{ task.name }}:</h4>
      <p>{{ task.status }}</p>
    </div>
  `,
})
export class MappedCompComponent {
  @Input() task!: { name: string; status: string };
}
@Component({
  selector: 'interface-comp',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inline.component.html',
})
export class InlineCompComponent {
  isLoggedIn = false;
  toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn;
    this.navigate();
  }
  @Input() testInput!: string;
  @Input() navigate!: () => void;

  constructor() {
    this.testInput = 'test';
    console.log('this is constructor', this.testInput);
  }

  ngOnInit() {
    this.testInput = 'test';
    console.log('OnInit', this.testInput);
  }

  testInterface: TestInterface = {
    name: 'ikhan',
    id: 25,
  };
}

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CompComponent,
    InlineCompComponent,
    MappedCompComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {
    console.log('initial router', router);
  }
  title = 'first-test';
  forChild = 'sent from parent';

  funcForChild = () => {
    console.log('funcForChild');
    this.forChild = 'sent from parent ' + 0;
    this.counter = 0;
  };

  navigate() {
    const current = this.router?.url;
    console.log('current', this.router);
    // const dynamicLink = current === '/isolated' ? '/' : '/isolated';
    // this.router.navigate([dynamicLink]);
  }

  counter = 0;

  tasks = [
    {
      name: 'task 1',
      status: 'done',
    },
    {
      name: 'task 2',
      status: 'pending',
    },
    {
      name: 'task 3',
      status: 'done',
    },
  ];

  handleClick() {
    this.forChild = 'sent from parent ' + this.counter++;
    console.log('clicked');
  }
}

import { Routes } from '@angular/router';
import {
  AppComponent,
  InlineCompComponent,
  MappedCompComponent,
} from './app.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: AppComponent,
  },
  {
    path: 'isolated',
    title: 'Isolated',
    component: InlineCompComponent,
  },
];

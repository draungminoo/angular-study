import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { arrayStudy } from './study/array.study';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    // Modules
    RouterOutlet,
  ],
})
export class AppComponent {
  constructor() {
    arrayStudy();
  }
}

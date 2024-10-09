import { Component } from '@angular/core';
import { Subscription, takeUntil } from 'rxjs';
import { RxjsComponentService } from './rxjs-component.service';
import { onComponentDestroy } from '../../../../../tools/on-destroy.tool';

@Component({
  selector: 'app-rxjs-component',
  templateUrl: './rxjs-component.component.html',
  styleUrl: './rxjs-component.component.scss',
  standalone: true,
  imports: [],
})
export class RxjsComponentComponent {
  private onDestroy = onComponentDestroy();

  constructor(private rxjsComponentService: RxjsComponentService) {
    // observe rxjs
    this.rxjsComponentService
      .someSubObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (data) => {
          console.log('This is from RXJS');
          console.log(data);
        },
      });
  }
}

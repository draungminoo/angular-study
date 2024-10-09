import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsComponentService {
  private someSub = new Subject();

  constructor() {}

  someSubObservable() {
    return this.someSub.asObservable();
  }
  setSomeSub(data: any) {
    this.someSub.next(data);
  }
}

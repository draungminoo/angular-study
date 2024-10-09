import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDrawerService {
  private drawerStatusSub = new BehaviorSubject<boolean>(false);
  private drawerWidthSub = new BehaviorSubject<string>('fit-content');
  private portalComponentSub = new BehaviorSubject<ComponentType<any> | null>(
    null,
  );

  constructor() {}

  // drawer stats subject
  drawerStatusObservable() {
    return this.drawerStatusSub.asObservable();
  }
  openDrawer() {
    this.drawerStatusSub.next(true);
  }
  closeDrawer() {
    this.drawerStatusSub.next(false);
  }

  // drawer width subject
  drawerWidthObservable() {
    return this.drawerWidthSub.asObservable();
  }
  setDrawerWidth(width: string = 'fit-content') {
    this.drawerWidthSub.next(width);
  }

  // portal subject
  portalComponentObservable() {
    return this.portalComponentSub.asObservable();
  }
  setPortalCompoent(component: ComponentType<any> | null) {
    this.portalComponentSub.next(component);
  }
}

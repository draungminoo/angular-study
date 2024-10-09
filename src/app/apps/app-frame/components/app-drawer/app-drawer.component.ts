import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AppDrawerService } from './app-drawer.service';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { onComponentDestroy } from '../../../tools/on-destroy.tool';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-app-drawer',
  templateUrl: './app-drawer.component.html',
  styleUrl: './app-drawer.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, PortalModule],
})
export class AppDrawerComponent implements AfterViewInit {
  @ViewChild('drawer') private drawer!: MatDrawer;

  // selected portal
  selectedPortal: ComponentPortal<any> | null = null;

  // drawer with
  drawerWidth: string = '';

  private onDestroy = onComponentDestroy();

  constructor(private appDrawerService: AppDrawerService) {
    // observe portal component
    this.appDrawerService
      .portalComponentObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (component) => {
          setTimeout(() => {
            if (component) {
              this.selectedPortal = new ComponentPortal(component);
            } else {
              this.selectedPortal = null;
            }
          });
        },
      });

    // observe drawer width
    this.appDrawerService
      .drawerWidthObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (width) => {
          setTimeout(() => {
            this.drawerWidth = width;
          });
        },
      });
  }

  ngAfterViewInit(): void {
    // this.drawer.disableClose = true;

    // observe drawer status
    this.appDrawerService
      .drawerStatusObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (status) => {
          setTimeout(() => {
            if (status) {
              this.drawer.open();
            } else {
              this.drawer.close();
            }
          });
        },
      });
  }
}

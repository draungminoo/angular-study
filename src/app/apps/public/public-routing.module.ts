import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-list',
      },
      {
        path: 'user-list',
        loadComponent: () =>
          import('./components/user-list/user-list.component').then(
            (c) => c.UserListComponent,
          ),
      },
      {
        path: 'rxjs',
        loadComponent: () =>
          import(
            './components/user-list/components/rxjs-component/rxjs-component.component'
          ).then((c) => c.RxjsComponentComponent),
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PublicRoutingModule {}

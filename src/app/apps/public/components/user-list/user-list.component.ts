import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';
import { TableFirstLastComponent } from '../../../../components/table-first-last/table-first-last.component';
import { TablePagesComponent } from '../../../../components/table-pages/table-pages.component';
import { AppDrawerService } from '../../../app-frame/components/app-drawer/app-drawer.service';
import { RxjsComponentService } from './components/rxjs-component/rxjs-component.service';
import { UserListFilterComponent } from './components/user-list-filter/user-list-filter.component';
import { UserListService } from './user-list.service';
import { UserType } from './user-list.type';
import { ChartComponentComponent } from './components/chart-component/chart-component.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    // Modules
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,

    // Components
    ChartComponentComponent,
    TableFirstLastComponent,
    TablePagesComponent,
  ],
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // form control
  filterFormControl = new FormControl();

  activePage: number = 1;
  parentPageList: number[] = new Array(10);

  // table
  displayedColumns: string[] = [
    'no',
    'name',
    'age',
    'gender',
    'race',
    'occupation',
    'menu',
  ];
  displayedColumns2: string[] = ['religion', 'address'];
  displayedColumns3: string[] = ['religion', 'address'];

  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  userList: UserType[] = [];
  filteredUserList: UserType[] = [];
  dataSource = new MatTableDataSource<UserType>();

  constructor(
    private homeService: UserListService,
    private appDrawerService: AppDrawerService,
    private rxjsComponentService: RxjsComponentService,
  ) {
    this.homeService
      .getUserFromServer()
      .then((users) => {
        this.userList = users;
        this.filterUserList('');
      })
      .catch((e) => {
        console.log(e);
      });

    // form control
    this.filterFormControl.valueChanges.pipe(debounceTime(800)).subscribe({
      next: (name) => {
        this.filterUserList(name);
      },
    });

    // document event
    window.onclick = (e) => {
      this.rxjsComponentService.setSomeSub(Math.random());
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.tablePaginator;
  }

  pageChanged(pageNo: number) {
    this.activePage = pageNo;
  }

  firstPage(first: boolean) {
    this.isFirstPage = first;
    if (first) {
      this.isLastPage = false;
    }
  }

  filterUserList(name: string) {
    this.filteredUserList = [];

    // filter method
    this.filteredUserList = this.userList.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase()),
    );

    this.dataSource.data = this.filteredUserList;
  }

  openDrawer() {
    this.appDrawerService.openDrawer();
  }

  openPortal() {
    this.appDrawerService.setDrawerWidth('400px');
    this.appDrawerService.setPortalCompoent(UserListFilterComponent);
    this.appDrawerService.openDrawer();
  }

  ngOnDestroy() {
    this.appDrawerService.closeDrawer();
    this.appDrawerService.setPortalCompoent(null);
    this.appDrawerService.setDrawerWidth();
  }
}

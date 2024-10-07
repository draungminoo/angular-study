import { Component } from '@angular/core';
import { TableFirstLastComponent } from '../../../../components/table-first-last/table-first-last.component';
import { TablePagesComponent } from '../../../../components/table-pages/table-pages.component';
import { UserListService } from './user-list.service';
import { UserType } from './user-list.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    // Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
})
export class UserListComponent {
  activePage: number = 1;
  parentPageList: number[] = new Array(10);

  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  usersList: UserType[] = [];

  constructor(private homeService: UserListService) {
    this.homeService.getUserFromServer().then((users) => {
      this.usersList = users;
    });
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
}

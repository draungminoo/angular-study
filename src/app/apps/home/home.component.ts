import { Component } from '@angular/core';
import { TableFirstLastComponent } from '../../components/table-first-last/table-first-last.component';
import { TablePagesComponent } from '../../components/table-pages/table-pages.component';
import { HomeService } from './home.service';
import { UserType } from './home.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    // Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
})
export class HomeComponent {
  activePage: number = 1;
  parentPageList: number[] = new Array(10);

  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  usersList: UserType[] = [];

  constructor(private homeService: HomeService) {
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

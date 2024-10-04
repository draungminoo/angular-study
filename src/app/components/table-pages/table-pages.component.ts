import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-pages',
  templateUrl: './table-pages.component.html',
  styleUrl: './table-pages.component.scss',
  standalone: true,
  imports: [
    // Module
    MatButtonModule,
    MatIconModule,
  ],
})
export class TablePagesComponent {
  // Input
  @Input() activePage: number = 4;
  @Input() pageList: number[] = new Array(7);

  // Output
  @Output() onPageChanged = new EventEmitter();
  @Output() onFirstPage = new EventEmitter();
  @Output() onLastPage = new EventEmitter();

  constructor() {}

  selectPage(pageIndex: number) {
    this.onPageChanged.emit(pageIndex + 1);
  }
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-table-first-last',
  templateUrl: './table-first-last.component.html',
  styleUrl: './table-first-last.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
})
export class TableFirstLastComponent {
  constructor(private dialogService: DialogService) {}

  firstPageClick() {
    this.dialogService.openDialog();
  }
}

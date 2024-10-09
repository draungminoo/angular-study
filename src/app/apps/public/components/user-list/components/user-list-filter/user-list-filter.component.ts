import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrl: './user-list-filter.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    // Pipes
    DatePipe,

    // Module
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,

    // Components
  ],
})
export class UserListFilterComponent {
  // select single option
  selectOptionFormControl = new FormControl();
  selectOptionsList: string[] = [
    'Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple',
    'Orange',
    'Mango',
    'Grape',
    'Strawberry',
  ];

  // select multiple options
  selectMultipleOptionFormControl = new FormControl();
  selectedOptions: string[] = [];

  // date form control
  dateFormControl = new FormControl();
  pickedDate: string = '';

  // date rage form group
  dateRangeFormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private datePipe: DatePipe,
    private router: Router,
  ) {
    // select option form control changes
    this.selectOptionFormControl.valueChanges.subscribe({
      next: (value) => {
        console.log(value);
      },
    });

    // observe select multiple option changes
    this.selectMultipleOptionFormControl.valueChanges.subscribe({
      next: (values) => {
        console.log(values);
        this.selectedOptions = values;
      },
    });

    // observe date changes
    this.dateFormControl.valueChanges.subscribe({
      next: (date) => {
        if (date) {
          const dateString = this.datePipe.transform(
            date,
            'MMM dd, yyyy HH:mm:ss',
          );
          console.log(dateString);
          this.pickedDate = date;
        }
      },
    });

    // date range changes
    this.dateRangeFormGroup.valueChanges.subscribe({
      next: (dateRange) => {
        console.log(dateRange);
      },
    });
    // this.dateRangeFormGroup.get('start')?.valueChanges.subscribe({
    //   next: (startDate) => {
    //     console.log(startDate);
    //   },
    // });
    // this.dateRangeFormGroup.get('end')?.valueChanges.subscribe({
    //   next: (endDate: any) => {
    //     console.log(endDate);
    //   },
    // });
  }

  goToNextPage() {
    this.router.navigate(['app/public/rxjs']);
  }

  countOtherOptions() {
    const count = this.selectedOptions.length;
    if (count > 1) {
      if (count == 2) {
        return '(+1 other)';
      } else {
        return `(+${count - 1} others)`;
      }
    } else {
      return '';
    }
  }
}

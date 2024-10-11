import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeNamesEnum } from '../../../../../../resources/enums/theme.enum';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrl: './chart-component.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
})
export class ChartComponentComponent {
  chipsList: string[] = ['Apple', 'Orange', 'Mango'];
  chipsGridItemList: string[] = [];

  // chip option list
  chipOptionListFormControl = new FormControl();

  // theme
  themeNamesEnum = ThemeNamesEnum;

  // username form control
  loginFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z]{4,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      this.customPasswordValidator,
    ]),
  });

  constructor() {
    // observe chip option changes
    this.chipOptionListFormControl.valueChanges.subscribe({
      next: (value) => {
        console.log(value);
        this.restoreChips();
      },
    });
  }

  customPasswordValidator(control: AbstractControl) {
    const value = control.value;
    const regex = /^[a-z]{4,}$/;

    if (!regex.test(value)) {
      return { invalidPassword: true };
    }

    return null;
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.chipOptionListFormControl.disable();
    //   setTimeout(() => {
    //     this.chipOptionListFormControl.enable();
    //   }, 3000);
    // }, 3000);

    setTimeout(() => {
      this.chipOptionListFormControl.setValue([
        this.chipsList[0],
        this.chipsList[1],
      ]);
    }, 3000);
  }

  restoreChips() {
    this.chipOptionListFormControl.setValue(
      [this.chipsList[0], this.chipsList[1]],
      { emitEvent: false },
    );
  }

  removeChip(fruit: string) {
    this.chipsList = this.chipsList.filter((c) => c != fruit);
  }

  addChipGridItem(event: MatChipInputEvent) {
    this.chipsGridItemList.push(event.value);
    event.chipInput.clear();
  }

  removeChipGridItem(item: string) {
    this.chipsGridItemList = this.chipsGridItemList.filter((c) => c != item);
  }

  changeTheme(theme: ThemeNamesEnum) {
    document.documentElement.setAttribute('theme', theme);
  }

  toggleMode() {
    const mode = document.body.getAttribute('mode');
    if (mode != 'dark') {
      document.body.setAttribute('mode', 'dark');
    } else {
      document.body.setAttribute('mode', 'light');
    }
  }
}

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  standalone: true,
  imports: [
    // Modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class SigninComponent {
  @Input() username: string = 'aungminoo';

  signinFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private route: Router,
    private authService: AuthService,
  ) {}

  goToPrivateApp() {
    this.route.navigate(['app/private'], { replaceUrl: false });
  }

  goToPublicApp() {
    this.route.navigate(['app/public'], { replaceUrl: false });
  }

  signinUser() {
    const valid = this.signinFormGroup.valid;
    if (valid) {
      const value = this.signinFormGroup.value;

      this.authService.updateUser(value.password ?? '', value.username ?? '');
    }
  }
}

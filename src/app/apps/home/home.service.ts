import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvValues } from '../../../env/app.env';
import { UserType } from './home.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  // External
  getUserFromServer() {
    return new Promise<UserType[]>((res, rej) => {
      this.http
        .get<UserType[]>(`${AppEnvValues.SERVER_URL}/pse-team/users`)
        .subscribe({
          next: (users) => {
            res(users);
          },
          error: (error) => {
            rej(error);
          },
        });
    });
  }
}

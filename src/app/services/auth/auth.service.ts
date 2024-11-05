import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEnvValues } from '../../../env/app.env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  constructor(private http: HttpClient) {}

  checkUserInServer() {
    // real code
    // return new Promise((res, rej) => {
    //   this.http.get(`${AppEnvValues.SERVER_URL}/auth/currentUser`).subscribe({
    //     next: (user) => {
    //       res(user);
    //     },
    //     error: rej,
    //   });
    // });

    // example code
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.user);
      }, 2000);
    });
  }

  signinUser(username: string, password: string) {
    return new Promise((res, rej) => {
      this.http
        .post(`${AppEnvValues.SERVER_URL}/users/signin`, {
          username,
          password,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            res(data);
          },
          error: rej,
        });
    });
  }

  updateUser(name: string, username: string) {
    return new Promise((res, rej) => {
      this.http
        .patch(`${AppEnvValues.SERVER_URL}/users`, {
          name,
          username,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            res(data);
          },
          error: rej,
        });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

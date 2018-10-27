import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private usersURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Object> {
    return this.http.get(this.usersURL);
  }
}

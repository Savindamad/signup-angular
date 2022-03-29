import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupRequest } from '../models/signup-request.mode';
import { SignupResponse } from '../models/signup-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signup(data: SignupRequest): Observable<SignupResponse>{
    return this.http.post<SignupResponse>(`${environment.api}users`, data).pipe(take(1));
  }
}

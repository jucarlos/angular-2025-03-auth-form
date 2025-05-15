import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject( HttpClient );

  


  login(email: string , password: string ) {


    return this.http.post( `${baseUrl}/api/auth/login`, {
      email: email,
      password: password,
    }  )



  }




}

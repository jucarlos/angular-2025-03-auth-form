import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/login-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject( HttpClient );

  // propiedades de auth
  private authStatus: AuthStatus = 'not-authenticated';
  private user: User | null = null;
  private token: string = '';



  public getAuthStatus(): AuthStatus {

    if ( this.authStatus === 'checking') {
      return 'checking';
    }
    if ( this.user ) {
      return 'authenticated';
    }
    return 'not-authenticated'

  }

  public getUser(): User | null {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }


  public logout(): void {

     this.user = null;
     this.authStatus = 'not-authenticated';
     this.token = '';
     localStorage.removeItem('token');

  }


  


  login(email: string , password: string ): Observable<boolean> {


    return this.http.post<AuthResponse>( `${baseUrl}/api/auth/login`, {
      email: email,
      password: password,
    }  ).pipe(

      tap( resp => {

        this.authStatus = 'authenticated';
        this.user = resp.user;
        this.token = resp.token;

        localStorage.setItem('token', this.token);
        
      }),

      map( () => {
        return true
      } ),

      catchError ( error => {

       this.logout();
       return of( false );

      })



    )



  }




}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/login-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserDto } from '../interfaces/user-dto.interface';

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


  constructor() {
    this.checkStatus().subscribe();
  }


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


  public checkStatus() {

    this.authStatus = 'checking';
    const token = localStorage.getItem('token') ;
    if( !token ) {
      this.logout();
      return of ( false );
    }

    return this.http.get<AuthResponse>(`${baseUrl}/api/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe ( 

      tap( resp => {

        this.authStatus = 'authenticated';
        this.user = resp.user;
        this.token = resp.token;

        localStorage.setItem('token', this.token);

        console.log( 'Estoy en check estatus : ', resp );
      }),

      map( () => {
        return true;
      })


    )


  }

  public register(userDto: UserDto ): Observable<boolean> {

    this.authStatus = 'checking';

    return this.http.post<AuthResponse>(`${baseUrl}/api/auth/register`, 
      userDto )
      .pipe (

        tap( resp => {
          this.authenticationSuccess( resp );   
         }),

        map( () => {
          return true;
        } ),

         catchError ( error => {
              this.logout();
              return of( false );
        })

      ) 
  }
  


  public login(email: string , password: string ): Observable<boolean> {


    return this.http.post<AuthResponse>( `${baseUrl}/api/auth/login`, {
      email: email,
      password: password,
    }  ).pipe(

      tap( resp => {
        this.authenticationSuccess( resp );
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


  private authenticationSuccess( resp: AuthResponse ): void  {

        this.authStatus = 'authenticated';
        this.user = resp.user;
        this.token = resp.token;

        localStorage.setItem('token', this.token);

  }



}

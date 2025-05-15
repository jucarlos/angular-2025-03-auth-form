import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject( AuthService );
  private router = inject( Router );

  private fp = inject( FormBuilder );
  
  public hasError: boolean = false;
  public mensajeError: string = '';
  public isPosting: boolean = false;
  


  public miFormulario = this.fp.group({

    email: [ '', [ Validators.required, Validators.email ],  ],

    password: ['', [ Validators.required, Validators.minLength( 6 ) ],  ],

  }, );


  onSubmit(): void {

    if ( this.isPosting ) return;

    this.hasError = false;

    if ( this.miFormulario.invalid ) {
      this.hasError = true;
      this.mensajeError = 'Formulario incorrecto';
      return;
    }

    // desestructuración de objetos
    const { email = '' , password = '' } = this.miFormulario.value;

    this.isPosting = true;

    this.authService.login( email!, password! ).subscribe ( isAuthenticaded => {

      this.isPosting = false;
      
      if ( !isAuthenticaded ) {
        this.mensajeError = 'No estás autorizado';
        this.hasError = true;
        return;
      }

      console.log('Todo va bien');

      this.router.navigateByUrl('/');
      

    })



  }


}

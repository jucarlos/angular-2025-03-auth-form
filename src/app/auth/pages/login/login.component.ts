import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private fp = inject( FormBuilder );

  public hasError: boolean = false;
  public mensajeError: string = '';
  public isPosting: boolean = false;
  


  public miFormulario = this.fp.group({

    email: [ '', [ Validators.required, Validators.email ],  ],

    password: ['', [ Validators.required, Validators.minLength( 6 ) ],  ],

  }, );


  onSubmit(): void {

    this.hasError = false;

    console.log('Estamos en el submit');

    console.log( this.miFormulario.value );

    if ( this.miFormulario.invalid ) {
      this.hasError = true;
      this.mensajeError = 'Formulario incorrecto';
      return;

    }


    console.log('Hacemos la petición de login')




  }


}

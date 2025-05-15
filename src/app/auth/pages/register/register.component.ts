import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  
  private fb = inject(FormBuilder);
  
  private validatorsService = inject(ValidatorService); 
  private authService = inject( AuthService );
  private router = inject(Router);

  public enviandoFormulario = false;
  public mensajeError = '';



  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: ['', [ 
      Validators.required, 
      Validators.pattern( this.validatorsService.emailPattern )
    ], [  ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });


  constructor(
  
  ) {}

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    // Abc123
    

    this.myForm.markAllAsTouched();

    this.mensajeError = '';

    if ( this.enviandoFormulario === true || this.myForm.invalid ) return;

    this.enviandoFormulario = true;

    

    


  }



}

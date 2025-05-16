import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/services/validator.service';
import { AuthService } from '../../services/auth.service';
import { UserDto } from '../../interfaces/user-dto.interface';

import Swal from 'sweetalert2';

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

  public enviandoFormulario: boolean  = false;
  public mensajeError: string = '';



  public myForm: FormGroup = this.fb.group({
    name: ['',  [ Validators.required ]  ],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    
    email: ['', [ 
      Validators.required, 
      Validators.pattern( this.validatorsService.emailPattern )
    ], [  ]],
    
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    
    password2: ['', [ Validators.required ]],
  }, 
  
  
  {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  }    );


  constructor(
  
  ) {}

  isValidField( field: string ) {
    // console.log( this.myForm.get('email')?.errors);
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    // Abc123

    this.myForm.markAllAsTouched();
    this.mensajeError = '';


    if ( this.enviandoFormulario === true || this.myForm.invalid ) return;
    
    this.enviandoFormulario = true;

    const newUser: UserDto = {
      email: this.myForm.controls['email'].value,
      fullName: this.myForm.controls['name'].value,
      password: this.myForm.controls['password'].value,
    };

    this.authService.register( newUser ).subscribe( resp => {

      console.log( resp );

      this.enviandoFormulario = false;

      if ( resp ) {

        this.router.navigateByUrl('/');
        // sweetalert
        Swal.fire({
          title: "El registro se ha creado correctamente",
          icon: "success",
          draggable: true,
        });


      }else {
        // si hay error
        this.mensajeError = 'Ha habido un error en el registro';
       
        setInterval(() => {
          this.mensajeError = ''
        }, 4000);
      }


    })






    

    


  }



}

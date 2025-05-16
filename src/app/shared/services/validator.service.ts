import { Injectable } from '@angular/core';
import { AbstractControl,  FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public isValidField( form: FormGroup, field: string ) {

    // si un campo de formulario en errors es null es que no hay errores
    return form.controls[field].errors  && form.controls[field].touched;
  }


  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    // antes en lugar de FormGroup había que poner AbstractControl
    return ( formGroup: FormGroup ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // Si devuelves un objeto es que hay errores.
      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { noSonIguales: true  }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }



}
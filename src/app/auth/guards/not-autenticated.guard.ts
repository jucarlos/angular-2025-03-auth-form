import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const notAutenticatedGuard: CanMatchFn = async (route, segments) => {

  // console.log('Pasando por el guards');

  // console.log('Ruta: ', route );
  // console.log('Segment: ', segments );

  const authService = inject( AuthService );
  const router = inject( Router );

  const isAutenticated = await firstValueFrom( authService.checkStatus() );

  if ( isAutenticated ) {

    router.navigateByUrl('/');
    return false;

  }


  return true;
};

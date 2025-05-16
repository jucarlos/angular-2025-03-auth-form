import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  console.log( 'Pasando por el interceptor');
  const authToken = localStorage.getItem('token') || '';

  // log bd
  
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  })


  return next(newReq);
};

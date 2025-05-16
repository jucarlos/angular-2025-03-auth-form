import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notAutenticatedGuard } from './auth/guards/not-autenticated.guard';

const routes: Routes = [

  //home
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule )
  },

  // auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canMatch: [

      notAutenticatedGuard

    ]
  },

  // Productos
  {
    path: 'products',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosModule)
  },

  {
    path: '**',
    redirectTo: 'auth'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

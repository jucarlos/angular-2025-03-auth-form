import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products-list',
        component: ListaProductosComponent,
      },
      {
        path: 'detalle-producto/:id',
        component: DetalleProductoComponent,
      },
      {
        path: '**',
        redirectTo: 'products-list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }

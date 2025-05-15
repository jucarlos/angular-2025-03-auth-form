import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    ListaProductosComponent,
    DetalleProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }

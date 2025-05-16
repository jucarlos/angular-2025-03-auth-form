import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListaProductosComponent,
    DetalleProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
  ]
})
export class ProductosModule { }

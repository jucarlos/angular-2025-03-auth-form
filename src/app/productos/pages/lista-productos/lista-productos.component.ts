import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-lista-productos',
  standalone: false,
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  

  private productService = inject( ProductsService );
  
  
  ngOnInit(): void {
    
    this.productService.getProducts().subscribe( resp => {


      console.log( resp );
    })
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/product-reponse.interface';

@Component({
  selector: 'app-lista-productos',
  standalone: false,
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  

  // private productService = inject( ProductsService );
  constructor(private productService: ProductsService) {}

  public isLoading: boolean = false;
  public products: Product[] = [];


  
  
  ngOnInit(): void {

    this.isLoading = true;
    
    this.productService.getProducts().subscribe( resp => {

      this.products = resp.products;
      this.isLoading = false;

      console.log( this.products );
    });
  }

}

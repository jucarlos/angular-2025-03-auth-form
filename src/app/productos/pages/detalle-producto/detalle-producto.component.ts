import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interface/product-reponse.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detalle-producto',
  standalone: false,
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  
  

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private productsService: ProductsService
  //   ) {}

  private activatedRoute = inject(ActivatedRoute) ;
  private productsService = inject(ProductsService) ;

  public product: Product | null = null;
  public isLoading = false;


  public getImagenByUrl(): string {

    return `${environment.baseUrl}/api/files/product/${this.product?.images[0]}`;
  }


  ngOnInit(): void {
    

    this.isLoading = true;
    const slug = this.activatedRoute.snapshot.params['id'];

    this.productsService.getProductById(slug).subscribe( resp => {

      
      this.isLoading = false;
      this.product = resp;
    });

  }







}

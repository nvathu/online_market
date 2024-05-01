import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})

export class ProductGridComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService) { }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
}





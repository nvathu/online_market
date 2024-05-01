import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService) { }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
}

import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './productItem.component.html',
  styleUrl: './productItem.component.css'
})
export class ProductsComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService) { }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
}

import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
/*constructor and method for pictures */
export class ProductItemComponent {
  @Input() products!: Product[];

  constructor(private productService: ProductService) { }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
}

import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Params,RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
/*constructor and method for pictures */
export class ProductItemComponent {
  @Input() products!: Product[];
  @Input() id!: string; 

  constructor(private productService: ProductService, private route : ActivatedRoute) {   
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
}

import { Component,Input} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Params,RouterLink } from '@angular/router';
import {SplitterModule} from 'primeng/splitter';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { NgModule } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,RouterLink, ButtonModule, SplitterModule,FormsModule,ImageModule ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product;
  @Input() id!: string;
  color!:string[]; 
  selectedColor: { color_id: string; color_name: string; color_hex: string } | undefined;
  selectedSize: string | undefined;
  productImage: string = '';
  

  constructor(public productService:ProductService,private route:ActivatedRoute,  private cartService: CartService ){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const colorParam = this.route.snapshot.queryParams['color'];
    if (id) {
        this.productService.getProductMetadata(id).subscribe((product) => {
            this.product = product;
            this.selectedColor = product.colors.find(color => color.color_id === colorParam) || product.colors[0];
            this.updateProductImage();
        });
    }
}
updateProductImage(): void {
 
  if (this.product && this.selectedColor) {
      this.productImage = this.productService.getProductImageByColor(this.product.id, this.selectedColor.color_id);
     
  }
}

onColorChange(color: { color_id: string; color_name: string; color_hex: string }): void {
  this.selectedColor = color;
  this.updateProductImage();
}

addToCart() {
  if (this.selectedColor && this.selectedSize) {
    const item = {
      id: this.product.id,
      color: this.selectedColor.color_id,
      size: this.selectedSize,
      quantity: 1
    };
    this.cartService.addCartItem(item);
  }
}
}


import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart-item';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule,InputNumberModule,FormsModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    items: CartItem[] = [];
    productMetaData: Product[] = [];

    constructor(
        private cartService: CartService,
        private productService: ProductService,
    ) {
        this.items = cartService.getAllCartItems();
        this.productService.getAllProductMetadata().subscribe((products) => {
            this.productMetaData = this.items
                .map((item) => {
                    return products.find((product) => product.id == item.id) as Product; 
                })
                .filter((product) => product != undefined);
        });
    }
    getProductImage(id: string, color_id: string): string {
        return this.productService.getProductImageByColor(id, color_id);
    }
    updateQuantity(item: CartItem, quantity: string) :void{ 
      return this.cartService.setCartItem({...item, quantity:parseInt(quantity)});
    } 

}

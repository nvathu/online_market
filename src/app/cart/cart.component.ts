import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart-item';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, InputNumberModule, FormsModule, ButtonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  productMetaData: Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getAllCartItems();
    this.productService.getAllProductMetadata().subscribe((products) => {
      this.productMetaData = products;
    });
  
    this.cartService.cartItemsChanged.subscribe(() => {
      this.items = this.cartService.getAllCartItems();
    });
  }

  getProductImage(id: string, color_id: string): string {
    return this.productService.getProductImageByColor(id, color_id);
  }

  getProductBrand(id: string): string {
    return this.productMetaData.find(product => product.id === id)?.brand ?? '';
  }

  getProductName(id: string): string {
    return this.productMetaData.find(product => product.id === id)?.name ?? '';
  }

  getProductPrice(id: string): number {
    return this.productMetaData.find(product => product.id === id)?.price ?? 0;
  }

  getColorName(id: string, colorId: string): string {
    return this.productMetaData.find(product => product.id === id)?.colors.find(color => color.color_id === colorId)?.color_name ?? '';
  }

  handleQuantityChange(item: CartItem, event: any): void {
    const value = event.value;
    const quantity = typeof value === 'string' ? parseInt(value, 10) : value;
    this.updateQuantity(item, quantity);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity === 0) {
      this.cartService.removeCartItem(item);
    } else {
      this.cartService.setCartItem({ ...item, quantity });
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeCartItem(item);
  }

  getTotalPrice(): string {
    const totalPrice = this.items.reduce((total, item) => {
      const productPrice = this.getProductPrice(item.id);
      return total + (productPrice * item.quantity);
    }, 0);
    return totalPrice.toFixed(2); 
  }

  getItemTotalPrice(item: CartItem): string {
    const productPrice = this.getProductPrice(item.id);
    const totalPrice = productPrice * item.quantity;
    return totalPrice.toFixed(2); 
  }

  checkout(): void {
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}

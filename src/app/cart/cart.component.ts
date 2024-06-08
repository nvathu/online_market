import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items: CartItem[] = [];

  constructor (private cartService: CartService){
   const items = cartService.getAllCartItems();
   console.log(items)
  }
  

}

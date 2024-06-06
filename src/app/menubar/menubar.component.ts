import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-menubar',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, BadgeModule],
    templateUrl: './menubar.component.html',
    styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
    cartItemCount: string = '0';

    constructor(private router: Router, private cartService: CartService) { }

    ngOnInit(): void {
        this.updateCartItemCount();
        this.cartService.cartItemsChanged.subscribe(() => {
            this.updateCartItemCount();
        });
    }

    updateCartItemCount(): void {
        const count = this.cartService.getTotalCartItems();
        this.cartItemCount = count > 0 ? count.toString() : '';
    }

}

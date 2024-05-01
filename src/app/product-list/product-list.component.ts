import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  listView: boolean = true;
  
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProductMetadata().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }

  toggleListView(): void {
    this.listView = true;
  }

  toggleGridView(): void {
    this.listView = false;
  }
}

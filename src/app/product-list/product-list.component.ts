import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
/*Imported MattButton Module and added therefor angular/material to the package.jason.
  Maybe there is the need to run npm install again*/

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

/*constructor and method for pictures as well as method for products and Metadata and listView/gridview switch methods */
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  listView: boolean = true;
  loading: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts(): void {
    this.loading = true;
    this.productService.getInitialProductMetadata(10) // Load initial 10 products
      .subscribe((products: Product[]) => {
        this.products = products;
        this.loading = false;
      });
  }
  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
  loadMoreProducts(): void {
    this.loading = true;
    this.productService.getNextProductMetadata(10) // Load next 10 products
      .subscribe((nextProducts: Product[]) => {
        this.products = [...this.products, ...nextProducts]; // Append new products to existing ones
        this.loading = false;
      });
  }

  toggleListView(): void {
    this.listView = true;
  }

  toggleGridView(): void {
    this.listView = false;
  }

}

import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner'
/*Imported MattButton Module and added therefor angular/material to the package.jason.
  Maybe there is the need to run npm install again*/

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, MatIconModule, MatButtonModule, MatProgressSpinnerModule, ProgressSpinnerModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})

/*constructor and method for pictures as well as method for products and Metadata and listView/gridview switch methods */
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  listView: boolean = true;
  loading: boolean = false;
  initialLoadComplete: boolean = false;
 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts(): void {
    this.loading = true;
    this.productService.getInitialProductMetadata(25) // Load initial 25 products
      .subscribe((products: Product[]) => {
        this.products = products;
        this.loading = false;
        this.initialLoadComplete = true;
      });
  }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }

  loadMoreProducts(): void {
    this.loading = true;
    this.productService.getNextProductMetadata(25) // Load next 25 products
      .subscribe((nextProducts: Product[]) => {
        this.products = [...this.products, ...nextProducts]; // Append new products to existing ones
        this.loading = false;
      });
  }

  //Method for infinit scrolling
  /*
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    const max = document.documentElement.scrollHeight;
  
    // Detect if user has scrolled to the bottom of the page
    if (pos === max) {
      // Load more products
      this.loadMoreProducts();
    }
  }*/

  toggleListView(): void {
    this.listView = true;
   
  }

  toggleGridView(): void {
    this.listView = false;
 
  }

}

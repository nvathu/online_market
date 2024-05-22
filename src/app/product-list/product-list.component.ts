import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import { ActivatedRoute,Params,RouterLink } from '@angular/router';
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';


@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, ProductItemComponent, MatIconModule, MatButtonModule, MatProgressSpinnerModule, ProgressSpinnerModule, RouterLink, ProductDetailComponent, FilterSidebarComponent,
      FormsModule, InputTextModule, ButtonModule, InputGroupModule
    ]
})


export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  listView: boolean = true;
  loading: boolean = false;
  initialLoadComplete: boolean = false;
  id: string = '';
  color: string;
  noProductsMessage: string = "";
  colors: string[] = [];
  searchTerm: string = '';
  
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.color = this.route.snapshot.queryParams['color'] || '';
  }

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts(): void {
    this.loading = true;
    this.productService.getInitialProductMetadata(25).subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
      this.initialLoadComplete = true;
    });
  }

  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }

  loadMoreProducts(): void {
    this.loading = true;
    this.productService.getNextProductMetadata(25).subscribe((nextProducts: Product[]) => {
      this.products = [...this.products, ...nextProducts];
      this.applyFilters();
      this.loading = false;
    });
  }

  toggleListView(): void {
    this.listView = true;
  }

  toggleGridView(): void {
    this.listView = false;
  }

  onFiltersChanged(filters: any): void {
    this.applyFilters(filters);
  }

  applyFilters(filters?: any): void {
    if (filters || this.searchTerm) {
        this.filteredProducts = this.products.filter(product => {
            let matches = true;
            if (filters.brands && filters.brands.length > 0) {
                matches = filters.brands.includes(product.brand);
            }
            if (matches && filters.colors && filters.colors.length > 0) {
                matches = filters.colors.some((color: { color_id: string; color_name: string; color_hex: string; }) => product.colors.includes(color));
            }
            if (matches && filters.priceRange) {
                matches = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
            }
            if (matches && this.searchTerm) {
              matches = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            }
            return matches;
        });
    } else {
        this.filteredProducts = this.products;
    }

    // Check if there are any products after filtering
    if (this.filteredProducts.length === 0) {
      this.noProductsMessage = "No products match your search/filter criteria.";
    } else {
      this.noProductsMessage = "";
    }
}

onSearch(filters: any): void {
  this.applyFilters(filters);
}

}

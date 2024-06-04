import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { FilterSidebarComponent } from "../filter-sidebar/filter-sidebar.component";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule,
    ProductItemComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    RouterLink,
    ProductDetailComponent,
    FilterSidebarComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    HttpClientModule,
    ToolbarModule,
    SplitButtonModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  searchText: string = '';
  searchResults: Product[] = [];
  listView: boolean = true;
  loading: boolean = false;
  initialLoadComplete: boolean = false;
  items: any[];
  nextIndex: number = 0;

  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  selectedPriceRange: [number, number] = [0, 1000]; // Beispielwerte für den Preisbereich

  constructor(private productService: ProductService) {
    this.items = [
      { label: 'Update', icon: 'pi pi-refresh', command: () => this.updateProducts() },
      { label: 'Delete', icon: 'pi pi-times', command: () => this.deleteProducts() },
    ];
  }

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts(): void {
    this.loading = true;
    this.productService.getAllProductMetadata().subscribe((products) => {
      this.allProducts = products;
      this.searchProducts();
      this.loading = false;
      this.initialLoadComplete = true;
    });
  }

  searchProducts(): void {
    this.searchResults = this.allProducts.filter((product) => this.filterProducts(product));
    this.nextIndex = 0;
    this.products = this.searchResults.slice(this.nextIndex, this.nextIndex + 25);
    this.nextIndex += 25;
  }

  filterProducts(product: Product): boolean {
    const searchTextLower = this.searchText.toLowerCase();
    const matchesSearchText =
      product.name.toLowerCase().includes(searchTextLower) ||
      product.brand.toLowerCase().includes(searchTextLower) ||
      product.colors.some((color) => color.color_name.toLowerCase().includes(searchTextLower)) ||
      product.category.toLowerCase().includes(searchTextLower) ||
      product.type.toLowerCase().includes(searchTextLower) ||
      product.gender.toLowerCase().includes(searchTextLower);

    const matchesBrand = this.selectedBrands.length ? this.selectedBrands.includes(product.brand) : true;
    const matchesColor = this.selectedColors.length ? product.colors.some((color) => this.selectedColors.includes(color.color_name)) : true;
    const matchesPrice = product.price >= this.selectedPriceRange[0] && product.price <= this.selectedPriceRange[1];

    return matchesSearchText && matchesBrand && matchesColor && matchesPrice;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchProducts();
    }
  }

  loadMoreProducts(): void {
    this.loading = true;
    const moreProducts = this.searchResults.slice(this.nextIndex, this.nextIndex + 25);
    this.products = [...this.products, ...moreProducts];
    this.nextIndex += 25;
    this.loading = false;
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

  updateProducts(): void {
    // Logik zum Aktualisieren der Produkte
  }

  deleteProducts(): void {
    // Logik zum Löschen der Produkte
  }

  onFiltersChanged(filters: { brands: string[]; colors: string[]; priceRange: [number, number] }): void {
    this.selectedBrands = filters.brands;
    this.selectedColors = filters.colors;
    this.selectedPriceRange = filters.priceRange;
    this.searchProducts();
  }
}

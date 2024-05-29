import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-filter-sidebar',
    standalone: true,
    imports: [ CommonModule, FormsModule, MultiSelectModule, SliderModule],
    templateUrl: './filter-sidebar.component.html',
    styleUrl: './filter-sidebar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSidebarComponent { 
  brands: any[] = [];
  colors: any[] = [];
  priceRange: number[] = [0, 1000];  // Beispielwerte für den Preisbereich
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  selectedPriceRange: number[] = [0, 1000];
  @Output() filtersChanged = new EventEmitter<{brands: string[], colors: string[], priceRange: [number, number]}>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.productService.getAllProductMetadata().subscribe(products => {
      this.brands = [...new Set(products.map(product => product.brand))].map(brand => ({ label: brand, value: brand }));
      this.colors = [...new Set(products.flatMap(product => product.colors.map(color => color.color_name)))].map(color => ({ label: color, value: color }));
      const prices = products.map(product => product.price);
      this.priceRange = [Math.min(...prices), Math.max(...prices)];
      this.selectedPriceRange = [Math.min(...prices), Math.max(...prices)];
    });
  }

  applyFilters() {
    this.filtersChanged.emit({
      brands: this.selectedBrands,
      colors: this.selectedColors,
      priceRange: [this.selectedPriceRange[0], this.selectedPriceRange[1]]
    });
  }
}

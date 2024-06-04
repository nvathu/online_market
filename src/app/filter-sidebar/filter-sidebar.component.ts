import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, SliderModule, MultiSelectModule, HttpClientModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css'],
})
export class FilterSidebarComponent {
  brands: any[] = [];
  colors: any[] = [];
  priceRange: number[] = [0, 1000];  // Beispielwerte für den Preisbereich
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  rangeValues: number[] = [0, 1000]; // Array für den Slider
  @Output() filtersChanged = new EventEmitter<{ brands: string[], colors: string[], priceRange: [number, number] }>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.productService.getAllProductMetadata().subscribe(products => {
      this.brands = [...new Set(products.map(product => product.brand))].map(brand => ({ label: brand, value: brand }));
      this.colors = [...new Set(products.flatMap(product => product.colors.map(color => color.color_name)))].map(color => ({ label: color, value: color }));
      const prices = products.map(product => product.price);
      this.priceRange = [Math.min(...prices), Math.max(...prices)];
      this.rangeValues = [Math.min(...prices), Math.max(...prices)]; // Initialisieren der rangeValues mit den Preiswerten
    });
  }

  applyFilters() {
    this.filtersChanged.emit({
      brands: this.selectedBrands,
      colors: this.selectedColors,
      priceRange: [this.rangeValues[0], this.rangeValues[1]]
    });
  }

  toggleSelection(array: any[], value: string) {
    console.log('Array before toggle:', array);
    console.log('Value to toggle:', value);
    if (!Array.isArray(array)) {
      console.error('Provided value is not an array');
      return;
    }
  
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
    console.log('Array after toggle:', array);
    this.applyFilters();
  }
  
}

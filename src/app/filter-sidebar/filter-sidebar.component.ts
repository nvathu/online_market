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
    brands: string[] = [];
    colors: string[] = [];
    selectedBrands: string[] = [];
    selectedColors: string[] = [];
    selectedPriceRange: number[] = [0, 500];
  
    @Output() filtersChanged = new EventEmitter<any>();
  
    constructor(private productService: ProductService) { }
  
    ngOnInit(): void {
       
        this.productService.productMetadata.subscribe(products => {
          const allColors = products.flatMap(product => product.colors);
          this.brands = Array.from(new Set(products.map(product => product.brand)));
         
          this.colors = Array.from(new Set(allColors.map(color => color.color_name)));
        });
      }
  
    onFiltersChanged(): void {
      const filters = {
        brands: this.selectedBrands,
        colors: this.selectedColors,
        priceRange: this.selectedPriceRange
      };
      this.filtersChanged.emit(filters);
    }
}

import { Component,Input} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Params,RouterLink } from '@angular/router';
import {SplitterModule} from 'primeng/splitter';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,RouterLink,SplitterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product;
  @Input() id!: string;
  color!:string[]; 
  

  constructor(public productService:ProductService,private route:ActivatedRoute ){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.productService.getProductMetadata(this.id).subscribe((product:Product) =>{
      this.product = product;
    });
    this.color = this.route.snapshot.params['color'];
    
  }
  getProductImage(id: string): string {
    return this.productService.getProductImage(id);
  }
 



}

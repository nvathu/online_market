import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { MenuItem } from 'primeng/api/menuitem';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../services/cart-item';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, InputNumberModule,  CartComponent, FormsModule, ButtonModule, StepsModule, CalendarModule, InputTextModule,StepperModule,ReactiveFormsModule,RadioButtonModule, FloatLabelModule, DropdownModule  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addressForm!: FormGroup;
  countries: any[] = [];
  activeIndex: number = 0;
  selectedShipping: string = '';
  selectedPayment: string = '';
  steps: MenuItem[] = [];
  cartItems: CartItem[] = [];
  productMetaData: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', [Validators.required, Validators.pattern(/.*\d+.*/)]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    // Prefill with example data
    this.addressForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      street: 'Main Street',
      streetNumber: '123',
      postalCode: '78462',
      city: 'Konstanz',
      country: { name: 'Germany' },
    });

    this.steps = [
      { label: 'Address' },
      { label: 'Delivery & Payment' },
      { label: 'Summary' },
    ];

    this.cartItems = this.cartService.getAllCartItems();
    this.productService.getAllProductMetadata().subscribe((products) => {
      this.productMetaData = products;
      this.calculateTotalPrice();
    });

    this.cartService.cartItemsChanged.subscribe(() => {
      this.cartItems = this.cartService.getAllCartItems();
      this.calculateTotalPrice();
    });
  }

  onAddressSubmit() {
    if (this.addressForm.valid) {
      this.nextStep();
    }
  }

  nextStep() {
    this.activeIndex++;
    if (this.activeIndex === 2) {
      this.calculateTotalPrice();
    }
  }

  prevStep() {
    this.activeIndex--;
  }

  confirmPurchase() {
    // Clear cart and finalize purchase
    this.cartService.clearCart();
    this.router.navigate(['/success']);
  }
  calculateTotalPrice() { 
    let shippingCost = 0;
  
    switch (this.selectedShipping) {
      case 'Standard + 5€ 3-5 days':
        shippingCost = 5;
        break;
      case 'Express + 10€  1-2 days':
        shippingCost = 10;
        break;
      case 'Overnight + 20€ Next day':
        shippingCost = 20;
        break;
      default:
        shippingCost = 0;
    }
  
    const cartTotal = this.cartItems.reduce((total, item) => {
      const productPrice = this.getProductPrice(item.id);
      return total + productPrice * item.quantity;
    }, 0);
  
    this.totalPrice = parseFloat((cartTotal + shippingCost).toFixed(2)); 
  }
  

  getProductPrice(id: string): number {
    return this.productMetaData.find((product) => product.id === id)?.price ?? 0;
  }

  getItemTotalPrice(item: CartItem): string {
    const productPrice = this.getProductPrice(item.id);
    const totalPrice = productPrice * item.quantity;
    return totalPrice.toFixed(2);
  }

  getProductName(id: string): string {
    return this.productMetaData.find((product) => product.id === id)?.name ?? '';
  }

  getProductImage(id: string, color_id: string): string {
    return this.productService.getProductImageByColor(id, color_id);
  }

  getProductBrand(id: string): string {
    return this.productMetaData.find((product) => product.id === id)?.brand ?? '';
  }

  getColorName(id: string, colorId: string): string {
    return (
      this.productMetaData
        .find((product) => product.id === id)
        ?.colors.find((color) => color.color_id === colorId)?.color_name ?? ''
    );
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}

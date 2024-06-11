import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Input  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-summary-step',
    standalone: true,
    imports: [
        CommonModule,  StepsModule ,  ButtonModule, FormsModule, 
    ],
    templateUrl: './summary-step.component.html',
    styleUrl: './summary-step.component.css',
})
export class SummaryStepComponent {
    @Input() address: any;
    @Input() selectedDeliveryOption: any;
    @Input() selectedPaymentOption: any;
    @Input() totalPrice: number = 0; // Initialize with a default value
  
    constructor(private router: Router) { }
  
    confirmPurchase() {
      // Clear the cart
      // this.cartService.clearCart();
      this.router.navigate(['/success']);
    }
  }

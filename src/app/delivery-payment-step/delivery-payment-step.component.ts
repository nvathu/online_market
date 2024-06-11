import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton'; 

@Component({
    selector: 'app-delivery-payment-step',
    standalone: true,
    imports: [
        CommonModule ,  StepsModule ,  ButtonModule, FormsModule, RadioButtonModule
    ],
    templateUrl: './delivery-payment-step.component.html',
    styleUrl: './delivery-payment-step.component.css',
})
export class DeliveryPaymentStepComponent {
    deliveryOptions = [
      { label: 'Standard Delivery', price: 5 },
      { label: 'Express Delivery', price: 10 },
      { label: 'Next Day Delivery', price: 20 }
    ];
    
    paymentOptions = [
      { label: 'Credit Card' },
      { label: 'PayPal' },
      { label: 'Bank Transfer' }
    ];
  
    selectedDeliveryOption = this.deliveryOptions[0];
    selectedPaymentOption = this.paymentOptions[0];
  
    constructor() { }
  }

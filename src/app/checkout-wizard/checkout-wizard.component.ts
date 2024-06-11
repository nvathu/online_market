import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressStepComponent } from '../address-step/address-step.component';
import { DeliveryPaymentStepComponent } from '../delivery-payment-step/delivery-payment-step.component';
import { SummaryStepComponent } from '../summary-step/summary-step.component';
@Component({

  selector: 'app-checkout-wizard',
  standalone: true,
imports: [CommonModule, FormsModule, ButtonModule, StepsModule, AddressStepComponent, DeliveryPaymentStepComponent, SummaryStepComponent ],
  templateUrl: './checkout-wizard.component.html',
  styleUrls: ['./checkout-wizard.component.css']
})
export class CheckoutWizardComponent {
  activeIndex: number = 0;
  steps: any[];

  constructor() {
    this.steps = [
      { label: 'Address' },
      { label: 'Delivery & Payment' },
      { label: 'Summary' }
    ];
  }

  next() {
    this.activeIndex++;
  }

  back() {
    this.activeIndex--;
  }

  canProceed(): boolean {
    // Implement logic to check if the current step is valid
    return true;
  }
}

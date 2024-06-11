import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-address-step',
    standalone: true,
    imports: [
        CommonModule ,  StepsModule ,  ButtonModule, FormsModule
    ],
    templateUrl: './address-step.component.html',
    styleUrl: './address-step.component.css',
})
export class AddressStepComponent {
    address = {
      name: 'John Doe',
      street: '123 Main St',
      postalCode: '12345',
      city: 'Anytown',
      country: 'Country'
    };
  
    constructor() { }
  }

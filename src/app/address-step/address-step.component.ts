import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-address-step',
    standalone: true,
    imports: [
        CommonModule ,  StepsModule ,  ButtonModule, FormsModule,    ReactiveFormsModule
    ],
    templateUrl: './address-step.component.html',
    styleUrl: './address-step.component.css',
})
export class AddressStepComponent {
    addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Set default values (simulating pre-filled address)
    this.addressForm.setValue({
      name: 'John Doe',
      street: '123 Main St',
      postalCode: '12345',
      city: 'Anytown',
      country: 'Country'
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log('Address is valid:', this.addressForm.value);
      // Proceed to the next step
    } else {
      console.error('Address form is invalid');
    }
  }
  }

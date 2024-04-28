import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, CommonModule, FloatLabelModule, CalendarModule, DropdownModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {

  countries = [{ name: "USA" }, { name: "New Zealand" }, { name: "Germany" }, { name: "Vietnam" }];
  showEmailHint: boolean = true;


  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    birthdate: new FormControl('', [
      Validators.required,
    ]),
    street: new FormControl('', [
      Validators.required,
    ]),
    streetNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/),
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/),
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
  });



  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get birthdate() { return this.registerForm.get('birthdate'); }
  get street() { return this.registerForm.get('street'); }
  get streetNumber() { return this.registerForm.get('streetNumber'); }
  get postalCode() { return this.registerForm.get('postalCode'); }
  get city() { return this.registerForm.get('city'); }
  get country() { return this.registerForm.get('country'); }

  /*
  checkForOtherError() {
    // Logik, um nach anderen Fehlern zu suchen
    // Wenn ein anderer Fehler auftritt, setze showEmailHint auf false
    if () {
        this.showEmailHint = false;
    }
  }
   */

  onSubmit() {
    if (this.registerForm.invalid) {
     
    }

  }


}

import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, CommonModule, FloatLabelModule,CalendarModule,DropdownModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  countries = [{name: "USA"}, {name:"New Zealand"},{name: "Germany"},{name: "Vietnam"}];
  showEmailHint: boolean = true;
  

  registerForm = new FormGroup({
  
    email: new FormControl('', [
        Validators.required,
        Validators.email
    ]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
    ]),
    
  });

  get email(){
    return this.registerForm.get('email');
}
get password(){
  return this.registerForm.get('password');
}

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

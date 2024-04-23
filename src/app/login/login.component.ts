import { Component, importProvidersFrom } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, CommonModule, FloatLabelModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {


        loginForm = new FormGroup({
            email: new FormControl ('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl ('', [
                Validators.required,
            ])
        });
password: any;

        get email(){
            return this.loginForm.get('email');
        }

        onSubmit() {
            if (this.loginForm.invalid) {
                
            }
        }
}

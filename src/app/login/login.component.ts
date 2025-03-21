import { Component, importProvidersFrom } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
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

    /*From Group with Validators*/
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ])
    });

    /*Getter for Validators*/
    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    /*Submit function, not fully implemented yet*/
    onSubmit() {
        if (this.loginForm.invalid) {

        }
    }
}

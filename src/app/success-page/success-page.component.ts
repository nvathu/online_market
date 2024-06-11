import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-success-page',
    standalone: true,
    imports: [
        CommonModule,  StepsModule ,  ButtonModule, FormsModule
    ],
    templateUrl: './success-page.component.html',
    styleUrl: './success-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessPageComponent {
    constructor() { }
  }
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

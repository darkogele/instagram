import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_modules/material/material.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ConfirmComponent,
    TranslateModule
  ]
})
export class SharedModule { }

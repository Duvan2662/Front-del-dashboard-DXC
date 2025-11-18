import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.services';

@Component({
  selector: 'app-mobile-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mobile-page.html',
  styleUrl: './mobile-page.css',
})
export class MobilePage {

  myform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService:ValidatorsServices
  ){
    this.myform = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5), Validators.pattern(/^[^\s]+$/)]],
      imei1: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      imei2: [, [Validators.pattern(/^\d{15}$/)]],
      sistema_operativo: ['', Validators.required]
    });
  }

  downloadQR() {
  }
  getFieldError(arg0: string) {
throw new Error('Method not implemented.');
  }
  onSubmit() {
  }

  public isValidField = (field: string) => {
    return this.validatorService.isValidField(this.myform, field)
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.services';
import { NotificationToastServices } from '../../../../services/notification-toast.services';
import { MobileBD } from '../../interfaces/mobileBD.interface';
import { MobilServices } from '../../services/mobil.services';


@Component({
  selector: 'app-new-mobile-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-mobile-page.html',
  styleUrl: './new-mobile-page.css',
})
export class NewMobilePage {


  myform: FormGroup;


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsServices,
    private notificationToastService: NotificationToastServices,
    private mobilServices: MobilServices
  ) {
    this.myform = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5), Validators.pattern(/^[^\s]+$/)]],
      imei1: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      imei2: [, [Validators.pattern(/^\d{15}$/)]],
      sistema_operativo: ['', Validators.required]
    });
  }

  public onSubmit() {

    if (this.myform.valid) {
    const mobile = this.currentMobile;
    this.mobilServices.addMobile(mobile).subscribe();
    console.log(mobile);
    this.myform.reset();
    this.notificationToastService.toastSuccess("Dispositivo creado");
    }

  }

  public get currentMobile(): MobileBD {
    const mobile = this.myform.value as MobileBD;

    return {
      ...mobile,
      tipo: this.capitalizeEachWord(mobile.tipo),
      nombre: mobile.nombre.trim().toUpperCase(),
      imei1: mobile.imei1,
      imei2: mobile.imei2,
      sistema_operativo: mobile.sistema_operativo
    };
  }

  // Primera letra en mayúscula de toda la frase
  private capitalizeFirst(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  // Primera letra en mayúscula de cada palabra
  private capitalizeEachWord(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split(' ')
      .filter(word => word.trim() !== '')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  public isValidField = (field: string) => {
    return this.validatorService.isValidField(this.myform, field)
  }

  public getFieldError(field: string): string | null {
    const control = this.myform.get(field);
    if (!control || !control.errors) return null;

    const errors = control.errors;

    // --- mensajes genéricos ---
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['maxlength']) return `No puede superar los ${errors['maxlength'].requiredLength} caracteres.`;

    // --- mensajes específicos por patrón ---
    if (errors['pattern']) {
      switch (field) {
        case 'nombre':
          return 'El nombre no debe contener espacios.';
        case 'imei1':
          return 'El IMEI 1 debe tener exactamente 15 dígitos numéricos.';
        case 'imei2':
          return 'El IMEI 2 debe tener exactamente 15 dígitos numéricos.';
      }
    }

    return null;
  }




}

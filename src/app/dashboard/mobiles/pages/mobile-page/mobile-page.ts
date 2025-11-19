import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.services';
import { MobileDevice } from '../../interfaces/responsemobile.interface';
import { MobilServices } from '../../services/mobil.services';


@Component({
  selector: 'app-mobile-page',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './mobile-page.html',
  styleUrl: './mobile-page.css',
})
export class MobilePage {

  myform: FormGroup;
  isEditing : boolean = false;
  mobile: MobileDevice| null  = null;
  qrImage!: string;
  createdAt!: string;
  updatedAt!: string;


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsServices,
    private route: ActivatedRoute,
    private mobilServices: MobilServices
  ) {
    this.myform = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(33), Validators.minLength(5), Validators.pattern(/^[^\s]+$/)]],
      imei1: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      imei2: [, [Validators.pattern(/^\d{15}$/)]],
      sistema_operativo: ['', Validators.required]
    });
    this.myform.disable(); // formulario bloqueado por defecto
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mobilServices.getMobil(id).subscribe(res =>{

          this.mobile = res;      // guardas todo el objeto
          this.loadMobile(res);   // cargas el formulario
        })
      }
    });
  }

  downloadQR() {
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


  onSubmit() {
  }

  public isValidField = (field: string) => {
    return this.validatorService.isValidField(this.myform, field)
  }

  enableEditMode() {
    this.isEditing = true;
    this.myform.enable();
  }


  loadMobile(mobile: MobileDevice) {

      this.myform.patchValue({
        tipo: mobile.tipo,
        nombre: mobile.nombre,
        imei1: mobile.imei1,
        imei2: mobile.imei2,
        sistema_operativo: mobile.sistema_operativo,
      });

      // asignar valores NO editables
      this.qrImage = mobile.qr_image;
      this.createdAt = mobile.created_at;
      this.updatedAt = mobile.updated_at;
  }


}

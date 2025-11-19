import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.services';
import { MobileDevice } from '../../interfaces/responsemobile.interface';
import { MobilServices } from '../../services/mobil.services';
import { MobileBD } from '../../interfaces/mobileBD.interface';
import { NotificationToastServices } from '../../../../services/notification-toast.services';


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
  titleOfPage:string = 'Dispositivo Móvil';
  valorBoton:string = 'Editar'


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsServices,
    private route: ActivatedRoute,
    private mobilServices: MobilServices,
    private notificationToastService:NotificationToastServices
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
  public isValidField = (field: string) => {
    return this.validatorService.isValidField(this.myform, field)
  }


  public onClickButton(): void {
  if (this.isEditing) {
    this.onSave();
    return;
  }

  this.enableEditMode();
}

private enableEditMode(): void {
  this.isEditing = true;
  this.titleOfPage = 'Editar Dispositivo';
  this.valorBoton = 'Guardar';
  this.myform.enable();
}

private onSave(): void {

  if (this.myform.invalid) {
    this.myform.markAllAsTouched();
    return;
  }

  const mobile = this.currentMobile;
  const id = this.mobile!.id;

  this.mobilServices.updateMobil(id, mobile).subscribe(() => {

    this.notificationToastService.toastSuccess('Dispositivo actualizado');

    this.isEditing = false;
    this.titleOfPage = 'Dispositivo Móvil';
    this.valorBoton = 'Editar';
    this.myform.disable();

    this.mobilServices.getMobil(id).subscribe(res => {
      this.mobile = res;
      this.loadMobile(res);
    });

  });
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


  onSubmit() {
  }









}

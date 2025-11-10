import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.services';

@Component({
  selector: 'app-new-mobile-page',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './new-mobile-page.html',
  styleUrl: './new-mobile-page.css',
})
export class NewMobilePage {


  myform: FormGroup;


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsServices
  ) {
    this.myform = this.fb.group({
      id: [0],
      tipo: ['', [Validators.required, Validators.maxLength(33),Validators.minLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(33),Validators.minLength(5),Validators.pattern(/^[^\s]+$/)]],
      imei1: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(15),Validators.pattern('^[0-9]*$')]], 
      imei2: ['', [Validators.maxLength(15), Validators.minLength(15),Validators.pattern('^[0-9]*$')]],
      sistema_operativo: ['', Validators.required]
    });
  }

  public onSubmit() {
   console.log("Datos enviados");
  }


  public isValidField = (field:string) => {
    return this.validatorService.isValidField(this.myform,field)
  }

}

import { EmpleadoService } from 'src/app/services/empleado.service';
import { IEmpleado } from 'src/app/model/empleado';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})

export class EmpleadosFormComponent implements OnInit {
  currencyValueCad: string = '';
  currencyValueEur: string = '';
  empleadoForm: FormGroup;
  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
    this.empleadoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      departamento: ['', Validators.required],
      sueldo: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (!this.currencyValueCad) {
      this.loadCurrency();
    }
  }
  onSubmit() {
    if (this.empleadoForm.valid) {
      const formData = this.empleadoForm.value;
      const empleadoData: IEmpleado = {
        id: formData.id,
        nombre: formData.nombre,
        cargo: formData.cargo,
        departamento: formData.departamento,
        sueldo: formData.sueldo,
      };
      if (formData.id === ""){
        this.empleadoService.addEmpleado(empleadoData).subscribe((response) => {
          this.empleadoService.notifyEmpleadoAddedOrUpdated();  
          console.log('Empleado added:', response);
          alert('Empleado agregado!');
        });
      }else{
        this.empleadoService.updateEmpleado(empleadoData).subscribe((response) => {
          this.empleadoService.notifyEmpleadoAddedOrUpdated();  
          console.log('Empleado updated:', response);
          alert('Datos modificados!');
        });     
      }
      
      this.resetForm();
    }
  }
  //Cargar los datos sobre la cotización de las monedas
  loadCurrency (){
    this.empleadoService.getCurrency()
    .subscribe((res) => {
      console.log("Currency:");
      console.log(res);
      console.log(res.data.CAD);
      this.currencyValueCad = "CAD:" + res.data.CAD; 
      this.currencyValueEur = "EUR:" + res.data.EUR; 
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

  }
  resetForm() {
    // Reset the form to its initial state
    this.empleadoForm.reset();
  }
}

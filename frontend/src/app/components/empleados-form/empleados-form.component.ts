import { EmpleadoService } from 'src/app/services/empleado.service';
import { IEmpleado } from 'src/app/model/empleado';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})

export class EmpleadosFormComponent {
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
      console.log("formData.id")
      console.log(formData.id)
      if (formData.id === ""){
        this.empleadoService.addEmpleado(empleadoData).subscribe((response) => {
          // Handle the response or perform any necessary actions
          console.log('Empleado added:', response);
        });
      }else{
        this.empleadoService.updateEmpleado(empleadoData).subscribe((response) => {
          // Handle the response or perform any necessary actions
          console.log('Empleado updated:', response);
        });        
      }

    }
  }
}

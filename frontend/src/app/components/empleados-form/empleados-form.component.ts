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
        id: "",
        nombre: formData.nombre,
        cargo: formData.cargo,
        departamento: formData.departamento,
        sueldo: formData.sueldo,
      };

      this.empleadoService.addEmpleado(empleadoData).subscribe((response) => {
        // Handle the response or perform any necessary actions
        console.log('Empleado added:', response);
      });
    }
  }
}

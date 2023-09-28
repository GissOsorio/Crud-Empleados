import { Component } from '@angular/core';
import { EmpleadoService } from './services/empleado.service';
import { IEmpleado } from './model/empleado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'matselect';
  constructor(private empleadoService: EmpleadoService){}

  listEmpleado!:IEmpleado[]

  ngOnInit(){

    this.loadEmpleados();
  }

  private loadEmpleados(){
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.listEmpleado = data
      console.log("Empleados Loaded", this.listEmpleado)
    })
  }

}


import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IEmpleado } from 'src/app/model/empleado';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosFormComponent } from '../empleados-form/empleados-form.component'; // Adjust the path as needed
import { ICurrency } from 'src/app/model/currency';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.css']
})


export class EmpleadosTableComponent implements OnInit, OnDestroy {

  @ViewChild(EmpleadosFormComponent)
  private empleadosFormComponent!: EmpleadosFormComponent;

  private subs = new Subscription();

  displayedColumns: string[] = ['nombre', 'cargo', 'departamento', 'sueldo', 'actions'];

  public dataSource!: MatTableDataSource<IEmpleado>;

  private dataArray: any;

  constructor(private eService: EmpleadoService, private _snackBar: MatSnackBar, private fb: FormBuilder) {
   }

  ngOnInit() {
    this.loadEmpleados();
    this.subs.add(
      this.eService.empleadoAddedOrUpdated$.subscribe((value) => {
        if (value) {
          // Reload data when notifyEmpleadoAddedOrUpdated is true
          this.loadEmpleados();
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  deleteRow(element: any): void {
    const confirmDelete = confirm('Está seguro que desea eliminar este empleado?');
    if (confirmDelete) {
      this.eService.deleteEmpleado(element._id).subscribe(
        () => {
          console.log('Empleado Eliminado!');
          const index = this.dataArray.findIndex((item: { _id: any; }) => item._id === element._id);
          if (index !== -1) {
            this.dataArray.splice(index, 1);
            this.dataSource.data = this.dataArray;
          }
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  editRow(rowData: any) {
    
    let sueldoUSD = 0;
    console.log(rowData.nombre);
    sueldoUSD = rowData.sueldo;
    this.empleadosFormComponent.empleadoForm.patchValue({
      id: rowData._id,
      nombre: rowData.nombre,
      cargo: rowData.cargo,
      departamento: rowData.departamento,
      sueldo: rowData.sueldo
    });

  }

  refreshEmpleadoTable() {
    this.loadEmpleados(); // Call the method to reload data
  }

  loadEmpleados() {
    this.subs.add(this.eService.getEmpleados()
      .subscribe((res) => {
        console.log(res);
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<IEmpleado>(this.dataArray);
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        }));
  }



  public openRecord(id: string, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });    
  }

}
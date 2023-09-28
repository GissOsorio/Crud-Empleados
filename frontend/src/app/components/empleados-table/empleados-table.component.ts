import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IEmpleado } from 'src/app/model/empleado';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosFormComponent } from '../empleados-form/empleados-form.component'; // Adjust the path as needed

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.css']
})


export class EmpleadosTableComponent implements OnInit {

  @ViewChild(EmpleadosFormComponent)
  private empleadosFormComponent!: EmpleadosFormComponent;

  private subs = new Subscription();

  displayedColumns: string[] = ['nombre', 'cargo', 'departamento', 'sueldo', 'actions'];

  public dataSource!: MatTableDataSource<IEmpleado>;

  private dataArray: any;

  constructor(private eService: EmpleadoService, private _snackBar: MatSnackBar, private fb: FormBuilder) {
   }

  ngOnInit() {
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
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // Function to handle deleting a row
  deleteRow(element: any): void {
    // Show a confirmation dialog if needed
    const confirmDelete = confirm('Are you sure you want to delete this employee?');

    if (confirmDelete) {
      // Call the delete function from your service
      this.eService.deleteEmpleado(element._id).subscribe(
        () => {
          // Handle success, such as removing the row from the dataSource
          console.log('Employee deleted successfully.');
          
          // Assuming dataSource is an array of employees, you can remove the deleted employee from it
          // const index = this.dataSource.findIndex((e) => e._id === element._id);
          // if (index !== -1) {
          //   this.dataSource.splice(index, 1);
          // }
        },
        (error) => {
          // Handle error
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  editRow(rowData: any) {
    console.log(rowData.nombre);
    // Asignar los datos de la fila seleccionada al formulario
    this.empleadosFormComponent.empleadoForm.patchValue({
      id: rowData._id,
      nombre: rowData.nombre,
      cargo: rowData.cargo,
      departamento: rowData.departamento,
      sueldo: rowData.sueldo
    });
  }

  public openRecord(id: string, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });    
  }

}
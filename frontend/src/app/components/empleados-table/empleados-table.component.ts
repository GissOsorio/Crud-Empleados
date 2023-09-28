import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IEmpleado } from 'src/app/model/empleado';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-empleados-table',
  templateUrl: './empleados-table.component.html',
  styleUrls: ['./empleados-table.component.css']
})

export class EmpleadosTableComponent implements OnInit {

  private subs = new Subscription();

  displayedColumns: string[] = ['_id', 'nombre', 'cargo', 'departamento', 'sueldo',];

  public dataSource!: MatTableDataSource<IEmpleado>;

  private dataArray: any;

  constructor(private eService: EmpleadoService, private _snackBar: MatSnackBar) { }

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

  public openRecord(id: string, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });    
  }
}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../model/empleado';
import { BehaviorSubject } from 'rxjs';
import { ICurrency } from '../model/currency';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private serviceUrl = 'http://localhost:3000/empleados';
  private empleadoAddedOrUpdatedSubject = new BehaviorSubject<boolean>(false);

  empleadoAddedOrUpdated$ = this.empleadoAddedOrUpdatedSubject.asObservable();

  constructor(private httpclient: HttpClient) {}

  getEmpleados(): Observable<IEmpleado[]>{
    return this.httpclient.get<IEmpleado[]>(this.serviceUrl);
  }

  updateEmpleado(user: IEmpleado): Observable<IEmpleado> {
    return this.httpclient.put<IEmpleado>(`${this.serviceUrl}/${user.id}`, user);
  }

  addEmpleado(data: IEmpleado): Observable<IEmpleado> {

    const body = {
      nombre: data.nombre,
      cargo: data.cargo,
      departamento: data.departamento,
      sueldo: data.sueldo.toString(),
    };
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', 'application/json')

    return this.httpclient.post<IEmpleado>(`${this.serviceUrl}/`, body, {headers});

  }
  deleteEmpleado(id: string): Observable<IEmpleado> {
    return this.httpclient.delete<IEmpleado>(`${this.serviceUrl}/${id}`);
  }
  notifyEmpleadoAddedOrUpdated() {
    console.log("notify empleado added or updated");
    this.empleadoAddedOrUpdatedSubject.next(true);
  }
  getCurrency(): Observable<ICurrency> {
    const params = new HttpParams()
    .set('apikey', 'fca_live_GXyEaoewAwbg54UND0AuiuTcH4dV2fUu3OSn31Be')
    .set('currencies', 'EUR,USD,CAD')
    return this.httpclient.get<ICurrency>("https://api.freecurrencyapi.com/v1/latest", {params});
  }

  setEmpleadoAddedOrUpdated(value: boolean) {
    this.empleadoAddedOrUpdatedSubject.next(value);
  }
}



import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private serviceUrl = 'http://localhost:3000/empleados';

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
}



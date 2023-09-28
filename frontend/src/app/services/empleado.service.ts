import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.httpclient.patch<IEmpleado>(`${this.serviceUrl}/${user.id}`, user);
  }
  addEmpleado(user: IEmpleado): Observable<IEmpleado> {
    return this.httpclient.post<IEmpleado>(`${this.serviceUrl}/`, user);
  }
  deleteEmpleado(id: string): Observable<IEmpleado> {
    return this.httpclient.delete<IEmpleado>(`${this.serviceUrl}/${id}`);
  }
}



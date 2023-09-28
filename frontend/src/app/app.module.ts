import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosTableComponent } from './components/empleados-table/empleados-table.component';
import { EmpleadosFormComponent } from './components/empleados-form/empleados-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosTableComponent,
    EmpleadosFormComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
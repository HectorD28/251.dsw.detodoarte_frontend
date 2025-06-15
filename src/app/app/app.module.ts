import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule, // Agregar NgbModule para usar modales
    FormsModule, // Asegúrate de importar FormsModule aquí
  ]
})
export class AppModule { }

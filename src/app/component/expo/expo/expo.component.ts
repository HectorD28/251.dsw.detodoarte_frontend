import { Component, OnInit } from '@angular/core';
import { ObraDeArteService } from '../../../service/obradearte.service'; // Ajusta la ruta de importación según corresponda
import { IObraDeArteResponse } from '../../../model/obradearte-response';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-expo',
  templateUrl: './expo.component.html',
  styleUrls: ['./expo.component.css'],
  imports :[CommonModule], // Asegúrate de importar CommonModule y BrowserModule
  standalone: true,  
})
export class ExpoComponent implements OnInit {
  obras: IObraDeArteResponse[] = []; // Variable para almacenar las obras de arte
  loading: boolean = false;  // Variable para mostrar el estado de carga

  constructor(private obraDeArteService: ObraDeArteService) {}

  ngOnInit(): void {
    this.loading = true;
    this.obtenerObrasDeArte(); // Llamar al método para obtener las obras de arte
  }

  obtenerObrasDeArte(): void {
    this.obraDeArteService.obtenerTodasObras().subscribe(
      (data: IObraDeArteResponse[]) => {
        this.obras = data;  // Almacenar las obras de arte obtenidas
        this.loading = false; // Detener la carga

        // Mostrar una alerta si no se encuentran obras
        if (this.obras.length === 0) {
          this.mostrarAlertaSinObras();
        }
      },
      (error) => {
        console.error('Error al obtener las obras de arte', error);
        this.loading = false;  // Detener la carga en caso de error
        // Mostrar alerta en caso de error de conexión
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al cargar las obras de arte. Intenta de nuevo más tarde.',
        });
      }
    );
  }

  // Función para mostrar una alerta cuando no hay obras de arte
  mostrarAlertaSinObras(): void {
    Swal.fire({
      icon: 'info',
      title: 'No hay obras disponibles',
      text: 'Actualmente no hay obras de arte disponibles en la galería.',
    });
  }
}

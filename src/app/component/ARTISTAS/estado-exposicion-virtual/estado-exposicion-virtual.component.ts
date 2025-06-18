import { Component, OnInit } from '@angular/core';
import { ExposicionVirtualService } from '../../../service/ts/exposicion-virtual.service';  // Servicio para exposiciones virtuales
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-estado-exposicion-virtual',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './estado-exposicion-virtual.component.html',
  styleUrls: ['./estado-exposicion-virtual.component.css']
})
export class EstadoExposicionVirtualComponent{

  solicitudesVirtuales: any[] = [];

  constructor(private exposicionVirtualService: ExposicionVirtualService) { }

  ngOnInit(): void {
    this.obtenerEstadoExposicionesVirtuales();
  }

  obtenerEstadoExposicionesVirtuales(): void {
    this.exposicionVirtualService.obtenerTodasExposiciones().subscribe({
      next: (data) => {
        this.solicitudesVirtuales = data;
        console.log('Solicitudes de Exposición Virtual:', this.solicitudesVirtuales);
      },
      error: () => {
         Swal.fire({title: 'Error al obtener exposiciones virtuales',})
      }
    });
  }

  verDetalles(solicitud: any): void {
    Swal.fire({
      title: 'Detalles de la Solicitud de Exposición Virtual',
      html: `
        <p><strong>Obra:</strong> ${solicitud.idExposicionVirtual}</p>
        <p><strong>Estado Solicitud:</strong> ${solicitud.estadoPublicacion}</p>
        <p><strong>Fecha de Publicación:</strong> ${solicitud.fechaPublicacion}</p>
        <p><strong>Comentarios:</strong> ${solicitud.comentarios || 'N/A'}</p>
      `,
      icon: 'info'
    });
  }
}

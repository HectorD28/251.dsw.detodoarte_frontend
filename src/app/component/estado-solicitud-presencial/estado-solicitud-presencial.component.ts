import { Component, OnInit } from '@angular/core';
import { SolicitudExposicionPresencialService } from '../../service/ts/solicitud-exposicion-presencial.service';  // Servicio para solicitudes de exposición presencial
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ISolicitudExposicionPresencialResponse } from '../../model/solicitud-exposicion-presencial-response';
@Component({
  selector: 'app-estado-solicitud-presencial',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './estado-solicitud-presencial.component.html',
  styleUrls: ['./estado-solicitud-presencial.component.css']
})
export class EstadoSolicitudPresencialComponent {

  solicitudesPresenciales: any[] = [];

  constructor(private solicitudExposicionPresencialService: SolicitudExposicionPresencialService) { }

  ngOnInit(): void {
    this.obtenerEstadoSolicitudesPresenciales();
  }

  obtenerEstadoSolicitudesPresenciales(): void {
    this.solicitudExposicionPresencialService.obtenerTodasSolicitudes().subscribe({
      next: (data) => {
        this.solicitudesPresenciales = data;
        console.log('Solicitudes de Exposición Presencial:', this.solicitudesPresenciales);
      },
      error: () => {
        console.error('Error al obtener solicitudes de exposición presencial');
      }
    });
  }

  verDetalles(solicitud: any): void {
    Swal.fire({
      title: 'Detalles de la Solicitud de Exposición Presencial',
      html: `
        <p><strong>Obra:</strong> ${solicitud.o}</p>
        <p><strong>Estado Solicitud:</strong> ${solicitud.estadoSolicitud}</p>
        <p><strong>Fecha de Recepción:</strong> ${solicitud.fechaRecepcionSolicitud}</p>
        <p><strong>Comentarios:</strong> ${solicitud.comentarios || 'N/A'}</p>
      `,
      icon: 'info'
    });
  }
}

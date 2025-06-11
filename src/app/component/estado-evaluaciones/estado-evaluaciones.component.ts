import { Component, OnInit } from '@angular/core';
import { ObraDeArteService } from '../../service/ts/obradearte.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-estado-evaluaciones',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './estado-evaluaciones.component.html',
  styleUrls: ['./estado-evaluaciones.component.css']
})
export class EstadoEvaluacionesComponent {

  obras: any[] = [];  // Aquí guardaremos las obras y su estado de evaluación

  constructor(
    private obraDeArteService: ObraDeArteService, // Servicio para obtener obras
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerEstadoEvaluaciones();
  }

  // Función para obtener las evaluaciones de las obras
  obtenerEstadoEvaluaciones(): void {
    // Llamamos al servicio para obtener las obras con sus evaluaciones
    this.obraDeArteService.obtenerTodasObras().subscribe({
      next: (data) => {
        this.obras = data;
        console.log('Obras con estado de evaluaciones:', this.obras);
      },
      error: () => {
        console.error('Error al obtener las evaluaciones');
      }
    });
  }

  // Función para ver los detalles de la evaluación
  verDetalles(obra: any): void {
    // Lógica para mostrar los detalles de la evaluación (comentarios, motivos de rechazo, etc.)
    Swal.fire({
      title: 'Detalles de la Evaluación',
      html: `
        <p><strong>Obra:</strong> ${obra.titulo}</p>
        <p><strong>Motivo Rechazo Artística:</strong> ${obra.motivoRechazoArtistica || 'N/A'}</p>
        <p><strong>Motivo Rechazo Económica:</strong> ${obra.motivoRechazoEconomica || 'N/A'}</p>
      `,
      icon: 'info'
    });
  }

  // Método para redirigir a la pantalla de Solicitar Exposición
  navegarASolicitarExposicionPresencial(): void {
    this.router.navigate(['/solicitud-exposicion-presencial']);
  }
  
  navegarASolicitarExposicionVirtual(): void {
    this.router.navigate(['/solicitud-exposicion-virtual']);
  }

  // Eliminar una obra
eliminarObra(obra: any): void {
  console.log('ID de la obra a eliminar:', obra.idObra);  // Verifica si el ID es correcto
  Swal.fire({
    title: '¿Estás seguro de eliminar esta obra?',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Sí',
    icon: 'warning'
  }).then((result) => {
    if (result.isConfirmed) {
      this.obraDeArteService.eliminarObra(obra.idObra).subscribe(
        () => {
          this.obtenerEstadoEvaluaciones();  // Refrescar la lista después de eliminar
          Swal.fire('¡Eliminado!', 'La obra ha sido eliminada correctamente.', 'success');
        },
        (error) => {
          console.error('Error al eliminar la obra:', error);  // Muestra el error en la consola para depuración
          Swal.fire('Error', 'Hubo un problema al eliminar la obra.', 'error');
        }
      );
    }
  });
}

  // Editar una obra
  editarObra(obra: any): void {
    this.router.navigate(['/editar-obra', obra.idObra]);  // Redirigir a la pantalla de edición
  }
}

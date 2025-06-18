import { Component, OnInit, ViewChild } from '@angular/core';
import { ObraDeArteService } from '../../../service/ts/obradearte.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EvaluacionArtisticaService } from '../../../service/ts/evaluacion-artistica.service';
import { EvaluacionEconomicaService } from '../../../service/ts/evaluacion-economica.service';
import { IObraDeArteResponse } from '../../../model/obradearte-response';
import { ArtistaService } from '../../../service/ts/artista.service';
import { TokenService } from '../../../JWT/token.service';
import { ITecnicaResponse } from '../../../model/tecnica-response';
import { TecnicaService } from '../../../service/ts/tecnica.service';
import { IObraDeArteRequest } from '../../../model/obradearte-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estado-evaluaciones',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule],
  templateUrl: './estado-evaluaciones.component.html',
  styleUrls: ['./estado-evaluaciones.component.css']
})
export class EstadoEvaluacionesComponent implements OnInit {
  obras: IObraDeArteResponse[] = [];
  resultadoevaluacionesArtisticas: string[] = [];
  motivorechazoevaluacionesArtisticas: string[] = [];
  resultadoevaluacionesEconomicas: string[] = [];
  motivorechazoevaluacionesEconomicas: string[] = [];
  obraSeleccionada: IObraDeArteResponse | null = null;
  tecnicasDisponibles: ITecnicaResponse[] = [];  // Lista de técnicas
  tecnica: ITecnicaResponse | null = null;
  idPersona: number = 0;
  idArtista: number = 0;

  @ViewChild('editModal') editModal: NgbModal | undefined;

  constructor(
    private obraDeArteService: ObraDeArteService,
    private evaluacionArtisticaService: EvaluacionArtisticaService,
    private evaluacionEconomicaService: EvaluacionEconomicaService,
    private artistaService: ArtistaService,
    private tokenService: TokenService,
    private tecnicaService: TecnicaService,  // Servicio para obtener técnicas
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idPersona = this.tokenService.getUserId();
    this.getArtistaByIdPersona();
    this.getTecnicas();
  }

  obtenerObrasArtista(): void {
    this.obraDeArteService.obtenerObrasPorArtista(this.idArtista).subscribe({
      next: (data) => {
        this.obras = data;
        console.log('Obras cargadas:', this.obras);
        this.obtenerEvaluacionesParaObras();  // Llamar al método principal
      },
      error: () => {
        console.error('Error al obtener las evaluaciones');
      }
    });
  }

  // Método para obtener las técnica ascociada a la obra
  obtenerTecnicasPorObras(idObra:number): void {
    this.tecnicaService.obtenerTecnicaPorObraId(idObra).subscribe({
      next: (data) => {
        this.tecnica = data;
      },
      error: (err) => {
        console.error('Error al cargar técnicas', err);
      }
    });
  }

    // Método para obtener todas las técnicas disponibles
  getTecnicas(): void {
    this.tecnicaService.obtenerTodasTecnicas().subscribe({
      next: (data) => {
        this.tecnicasDisponibles = data;
        console.log('Técnicas cargadas:', this.tecnicasDisponibles);
      },
      error: (err) => {
        this.tecnicasDisponibles = [];
        console.error('Error al cargar técnicas', err);
        Swal.fire('Error', 'Hubo un problema al cargar las técnicas.', 'error');
      }
    });
  }

  getArtistaByIdPersona(): void {
    this.artistaService.obtenerTodosArtistas().subscribe({
      next: (artistas) => {
        const idPersonas = artistas.map(a => a.persona ? a.persona.persona_id : null);
        if (idPersonas.includes(this.idPersona)) {
          const artista = artistas.find(a => a.persona?.persona_id === this.idPersona); 
          if (artista) {
            this.idArtista = artista.idArtista;
            console.log('ID Artista Encontrado:', this.idArtista);
            this.obtenerObrasArtista();  // Obtener las evaluaciones de las obras
          } else {
            console.error('No se encontró el artista para esta persona.');
          }
        } else {
          console.error('El ID de la persona no se encuentra en los artistas.');
        }
      },
      error: (err) => {
        console.error('Error al obtener artistas', err);
      }
    });
  }

  // Método para obtener las evaluaciones artísticas de una obra
  obtenerEvaluacionesArtisticas(idObra: number, index: number): void {
    this.evaluacionArtisticaService.obtenerEvaluacionesPorObra(idObra).subscribe({
      next: (evaluacionesArtisticas) => {
        if (evaluacionesArtisticas.length > 0) {
          this.resultadoevaluacionesArtisticas[index] = evaluacionesArtisticas[evaluacionesArtisticas.length - 1].resultado;
          this.motivorechazoevaluacionesArtisticas[index] = evaluacionesArtisticas[evaluacionesArtisticas.length - 1].motivoRechazo;
        } else {
          this.resultadoevaluacionesArtisticas[index] = 'Revisión Pendiente';
          this.motivorechazoevaluacionesArtisticas[index] = 'N/A';
        }
      },
      error: () => {
        console.error('Error al obtener evaluación artística');
      }
    });
  }

  // Método para obtener las evaluaciones económicas de una obra
  obtenerEvaluacionesEconomicas(idObra: number, index: number): void {
    this.evaluacionEconomicaService.obtenerEvaluacionesPorObra(idObra).subscribe({
      next: (evaluacionesEconomicas) => {
        if (evaluacionesEconomicas.length > 0) {
          this.resultadoevaluacionesEconomicas[index] = evaluacionesEconomicas[evaluacionesEconomicas.length - 1].resultado;
          this.motivorechazoevaluacionesEconomicas[index] = evaluacionesEconomicas[evaluacionesEconomicas.length - 1].motivoRechazo;
        } else {
          this.resultadoevaluacionesEconomicas[index] = 'Revisión Pendiente';
          this.motivorechazoevaluacionesEconomicas[index] = 'N/A';
        }
      },
      error: () => {
        console.error('Error al obtener evaluación económica');
      }
    });
  }

  // Método principal que llama a los métodos para obtener ambas evaluaciones
  obtenerEvaluacionesParaObras(): void {
    console.log('Resultado Evaluaciones Económicas:', this.resultadoevaluacionesEconomicas);
    console.log('Motivo de Rechazo Evaluaciones Económicas:', this.motivorechazoevaluacionesEconomicas);
    console.log('Resultado Evaluaciones Artísticas:', this.resultadoevaluacionesArtisticas);
    console.log('Motivo de Rechazo Evaluaciones Artísticas:', this.motivorechazoevaluacionesArtisticas);

    this.obras.forEach((obra, index) => {
      const idObra = obra.obraId;
      if (idObra) {
        this.obtenerEvaluacionesArtisticas(idObra, index);
        this.obtenerEvaluacionesEconomicas(idObra, index);
      } else {
        console.error('La obra no tiene un ID válido:', obra);
      }
    });
  }

  verDetalles(obra: any, index: number): void {
    const resultadoArtistica = this.resultadoevaluacionesArtisticas[index] || 'Revisión Pendiente';
    const motivoRechazoArtistica = this.motivorechazoevaluacionesArtisticas[index] || 'N/A';
    const resultadoEconomica = this.resultadoevaluacionesEconomicas[index] || 'Revisión Pendiente';
    const motivoRechazoEconomica = this.motivorechazoevaluacionesEconomicas[index] || 'N/A';

    Swal.fire({
      title: 'Detalles de la Evaluación',
      html: `
        <p><strong>Obra:</strong> ${obra.titulo}</p>
        <p><strong>Motivo Rechazo Artística:</strong> ${motivoRechazoArtistica}</p>
        <p><strong>Motivo Rechazo Económica:</strong> ${motivoRechazoEconomica}</p>
      `,
      icon: 'info'
    });
  }

  navegarASolicitarExposicionPresencial(): void {
    this.router.navigate(['/solicitud-exposicion-presencial']);
  }

  navegarASolicitarExposicionVirtual(): void {
    this.router.navigate(['/solicitud-exposicion-virtual']);
  }

  eliminarObra(idObra: any): void {
    console.log('ID de la obra a eliminar:', idObra);
    Swal.fire({
      title: '¿Estás seguro de eliminar esta obra?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionArtisticaService.eliminarEvaluacion(idObra).subscribe(
          () => {
            this.evaluacionEconomicaService.eliminarEvaluacion(idObra).subscribe(
              () => {
                this.obraDeArteService.eliminarObra(idObra).subscribe(
                  () => {
                    Swal.fire('¡Eliminado!', 'La obra ha sido eliminada correctamente.', 'success');
                    this.obras = this.obras.filter(obra => obra.obraId !== idObra);
                  },
                  (error) => {
                    console.error('Error al eliminar la obra:', error);
                    Swal.fire('Error', 'Hubo un problema al eliminar la obra.', 'error');
                  }
                );
              },
              (error) => {
                console.error('Error al eliminar la Evaluacion Economica:', error);
                Swal.fire('Error', 'Hubo un problema al eliminar la Evaluacion Economica.', 'error');
              }
            );
          },
          (error) => {
            console.error('Error al eliminar la Evaluacion Artistica:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la Evaluacion Artistica.', 'error');
          }
        );
      }
    });
  }


  openEditModal(obra2: IObraDeArteResponse, modalTemplate: any): void {
    this.obraSeleccionada = { ...obra2 };  // Copiar la obra seleccionada para editarla
    this.modalService.open(modalTemplate);   // Abrir el modal usando el template
    console.log('Obra seleccionada:', this.obraSeleccionada);
  }

  guardarCambios(modalTemplate: any): void {
    if (this.obraSeleccionada) {
      // Convertimos id_tecnica a número
      const idTecnica = Number(this.obraSeleccionada.tecnicaId.idTecnica);
      
      // Verificamos que el ID sea un número válido
      if (isNaN(idTecnica)) {
        console.error('El ID de la técnica no es un número válido');
        return;
      }

      const fechaRealizacion = this.obraSeleccionada.fechaRealizacion;
      const fechaFormateada = fechaRealizacion.toString().split('T')[0];

      console.log('Obra stock:', this.obraSeleccionada.obraId);
      console.log('Obra titulo:', this.obraSeleccionada.titulo);
      console.log('Obra fechaRealizacion:', fechaRealizacion);
      console.log('Obra dimensiones:', this.obraSeleccionada.dimensiones);
      console.log('Obra idTecnica:', idTecnica);  // Aquí usamos el número
      console.log('Obra idArtista:', this.obraSeleccionada.artistaId.idArtista);
      console.log('Obra cantidadVisualizaciones:', this.obraSeleccionada.cantidadVisualizaciones);
      console.log('Obra rutaImagen:', this.obraSeleccionada.rutaImagen);
      console.log('Obra stock:', this.obraSeleccionada.stock);

      const obraActualizada: IObraDeArteRequest = {
        titulo: this.obraSeleccionada.titulo,
        fecha_realizacion: fechaRealizacion,
        dimensiones: this.obraSeleccionada.dimensiones,
        id_tecnica: idTecnica,  // Aquí se asegura que sea un número
        id_artista: this.obraSeleccionada.artistaId.idArtista,
        cantidad_visualizaciones: this.obraSeleccionada.cantidadVisualizaciones,
        ruta_imagen: this.obraSeleccionada.rutaImagen,
        precio: 0.0,
        stock: this.obraSeleccionada.stock
      };

      console.log('Obra Actualizada:', obraActualizada);

      this.obraDeArteService.actualizarObra(this.obraSeleccionada.obraId, obraActualizada).subscribe({
        next: () => {
          Swal.fire('Éxito', 'La obra se ha actualizado correctamente.', 'success');
          modalTemplate.close(); // Cerrar el modal
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar la obra.', 'error');
        }
      });
    }
  }
}

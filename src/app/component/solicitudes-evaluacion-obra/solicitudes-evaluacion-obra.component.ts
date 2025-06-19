import { Component, OnInit } from '@angular/core';
import { EspecialistaService } from '../../service/ts/especialista.service';
import { TokenService } from '../../JWT/token.service';
import { EvaluacionArtisticaService } from '../../service/ts/evaluacion-artistica.service';
import { EvaluacionEconomicaService } from '../../service/ts/evaluacion-economica.service';
import { forkJoin } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IEvaluacionArtisticaResponse } from '../../model/evaluacion-artistica-response';
import { IEvaluacionEconomicaResponse } from '../../model/evaluacion-economica-response';
import { Router } from '@angular/router';
import { CriterioEvaluacionArtisticaService } from '../../service/ts/criterio-evaluacion-artistica.service';
import { CriterioEvaluacionesArtisticasService } from '../../service/ts/criterio-evaluaciones-artisticas.service';

@Component({
  selector: 'app-solicitudes-evaluacion-obra',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule, NgIf],
  templateUrl: './solicitudes-evaluacion-obra.component.html',
  styleUrls: ['./solicitudes-evaluacion-obra.component.css']
})
export class SolicitudesEvaluacionObraComponent implements OnInit {

  // Arreglo para almacenar las solicitudes de evaluación de obras
  solicitudes: any[] = [];
  idPersona: number = 0;
  idEspecialista: number = 0;
  EvaluacionesArtisticasEspecialista: IEvaluacionArtisticaResponse[] = [];
  EvaluacionesEconomicasEspecialista: IEvaluacionEconomicaResponse[] = [];
  tecnicaId: number=0;


  constructor(
    private especialistaService: EspecialistaService,
    private criterioEvaluacionArtisticaService: CriterioEvaluacionArtisticaService,
    private criterioEvaluacionesArtisticasService: CriterioEvaluacionesArtisticasService,
    private router: Router,
    private tokenService: TokenService,
    private evaluacionArtisticaService: EvaluacionArtisticaService,
    private evaluacionEconomicaService: EvaluacionEconomicaService
  ) { }

  ngOnInit(): void {
    this.idPersona = this.tokenService.getUserId(); // Obtener el ID del especialista desde el token
    this.getEspecialistaByIdPersona();
  }

ObtenerEvaluacionesArtisticasPorEspecialista(idEspecialista: number): void {
  this.evaluacionArtisticaService.getEvaluacionesArtisticasPorEspecialista(idEspecialista).subscribe({
    next: (evaluacionesArtisticas) => {
      console.log('Evaluaciones artísticas obtenidas:', evaluacionesArtisticas);
      // Guardar las evaluaciones obtenidas en una variable del componente, si es necesario
      this.EvaluacionesArtisticasEspecialista = evaluacionesArtisticas;
      console.log('Evaluaciones artísticas obtenidas:',this.EvaluacionesArtisticasEspecialista)
      this.ObtenerEvaluacionesEconomicasPorEspecialista(this.idEspecialista)
    },
    error: (err) => {
      console.error('Error al obtener evaluaciones artísticas:', err);
    }
  });
}
ObtenerEvaluacionesEconomicasPorEspecialista(idEspecialista: number): void {
  this.evaluacionEconomicaService.getEvaluacionesEconomicasPorEspecialista(idEspecialista).subscribe({
    next: (evaluacionesArtisticas) => {
      console.log('Evaluaciones economicas obtenidas:', evaluacionesArtisticas);

      // Guardar las evaluaciones obtenidas en una variable del componente, si es necesario
      this.EvaluacionesEconomicasEspecialista = evaluacionesArtisticas;
      this.getSolicitudesDeEvaluacion();
    },
    error: (err) => {
      console.error('Error al obtener evaluaciones artísticas:', err);
    }
  });
}



  // Obtener el especialista por el ID de la persona
  getEspecialistaByIdPersona(): void {
    this.especialistaService.obtenerTodosEspecialistas().subscribe({
      next: (especialistas) => {
        const idPersonas = especialistas.map(e => e.persona ? e.persona.persona_id : null);
        if (idPersonas.includes(this.idPersona)) {
          const especialista = especialistas.find(e => e.persona?.persona_id === this.idPersona);
          if (especialista) {
            this.idEspecialista = especialista.idEspecialista;
            this.tecnicaId = especialista.tecnica.idTecnica;
            this.ObtenerEvaluacionesArtisticasPorEspecialista(this.idEspecialista)
          }
        }
      },
      error: (err) => {
        console.error('Error al obtener especialistas', err);
      }
    });
  }

getSolicitudesDeEvaluacion(): void {
  const solicitudesMap = new Map<number, any>();

  /* 1️⃣  Procesar evaluaciones artísticas */
  this.EvaluacionesArtisticasEspecialista.forEach(evaArt => {
    const idObra = evaArt.obra.obraId;

    solicitudesMap.set(idObra, {
      obraId:          idObra,
      tituloObra:      evaArt.obra.titulo,
      tecnica:         evaArt.obra.tecnicaId.nombreTecnica,
      fechaCreacion:   evaArt.obra.fechaRealizacion,
      evaluacionArtistica: evaArt.resultado,
      motivoRechazoArtistica: evaArt.motivoRechazo || 'N/A',
      /* los campos económicos se rellenarán después */
      evaluacionEconomica:    'Pendiente',
      motivoRechazoEconomica: 'N/A',
      acciones: 'Revisar',
    });
  });

  /* 2️⃣  Procesar evaluaciones económicas */
  this.EvaluacionesEconomicasEspecialista.forEach(evaEco => {
    const idObra = evaEco.obra.obraId;
    const registro = solicitudesMap.get(idObra);

    if (registro) {
      /* La obra ya estaba; completamos la parte económica */
      registro.evaluacionEconomica    = evaEco.resultado;
      registro.motivoRechazoEconomica = evaEco.motivoRechazo || 'N/A';
    } else {
      /* No había registro artístico: creamos uno nuevo
         con la parte artística en Pendiente               */
      solicitudesMap.set(idObra, {
        obraId:          idObra,
        tituloObra:      evaEco.obra.titulo,
        tecnica:         evaEco.obra.tecnicaId.nombreTecnica,
        fechaCreacion:   evaEco.obra.fechaRealizacion,
        evaluacionArtistica: 'Pendiente',
        motivoRechazoArtistica: 'N/A',
        evaluacionEconomica:    evaEco.resultado,
        motivoRechazoEconomica: evaEco.motivoRechazo || 'N/A',
        acciones: 'Revisar',
      });
    }
  });

  /* 3️⃣  Convertir el Map a un array para la vista */
  this.solicitudes = Array.from(solicitudesMap.values());
  console.log('Solicitudes combinadas:', this.solicitudes);
}


  // Métodos para revisar, aprobar o rechazar
  revisarSolicitud(solicitud: any): void {
    console.log('Revisando solicitud de obra:', solicitud);
    this.router.navigate(['/formulario-evaluacion-artistica']);
  }
}

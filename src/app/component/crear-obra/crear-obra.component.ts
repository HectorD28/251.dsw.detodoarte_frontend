import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TecnicaService } from '../../service/ts/tecnica.service';
import { ObraDeArteService } from '../../service/ts/obradearte.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ITecnicaResponse } from '../../model/tecnica-response';
import { TokenService } from '../../JWT/token.service'; 
import { CommonModule } from '@angular/common';
import { ArtistaService } from '../../service/ts/artista.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IArtistaResponse } from '../../model/artista-response';
import { EvaluacionArtisticaService } from '../../service/ts/evaluacion-artistica.service';
import { EvaluacionEconomicaService } from '../../service/ts/evaluacion-economica.service';
import { IObraDeArteResponse } from '../../model/obradearte-response';

@Component({
  selector: 'app-crear-obra',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.css']
})
export class CrearObraComponent implements OnInit {

  obraForm: FormGroup;
  tecnicas: ITecnicaResponse[] = [];
  obras: IObraDeArteResponse[] = [];
  artistas: IArtistaResponse[] = [];
  idPersona: number = 0;
  idArtista: number = 0;
  titulo: string = "";

  constructor(
    private tecnicaService: TecnicaService,
    private obraDeArteService: ObraDeArteService,
    private router: Router,
    private tokenService: TokenService,
    private artistaService: ArtistaService,
    private evaluacionArtisticaService: EvaluacionArtisticaService,
    private evaluacionEconomicaService: EvaluacionEconomicaService
  ) {
    this.obraForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      fecha_realizacion: new FormControl('', [Validators.required]),
      dimensiones: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      id_tecnica: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTecnicas();
    this.idPersona = this.tokenService.getUserId();
    console.log('ID Persona:', this.idPersona);
    this.getArtistaByIdPersona();
  }

  getTecnicas(): void {
    this.tecnicaService.obtenerTodasTecnicas().subscribe({
      next: (data) => {
        this.tecnicas = data;
        console.log('Técnicas cargadas:', this.tecnicas);
      },
      error: (err) => {
        this.tecnicas = [];
        console.error('Error al cargar técnicas', err);
        Swal.fire('Error', 'Hubo un problema al cargar las técnicas.', 'error');
      }
    });
  }

  getObrasDeArte(): void {
    this.obraDeArteService.obtenerTodasObras().subscribe({
      next: (data) => {
        this.obras = data;
        console.log('Obras cargadas:', this.obras);
        this.buscarObraPorTitulo(this.titulo);
      },
      error: (err) => {
        this.obras = [];
        console.error('Error al cargar Obras', err);
        Swal.fire('Error', 'Hubo un problema al cargar las Obras.', 'error');
      }
    });
  }

  getArtistaByIdPersona(): void {
    this.artistaService.obtenerTodosArtistas().subscribe({
      next: (artistas) => {
        console.log('Artistas obtenidos:', artistas);
        const idPersonas = artistas.map(a => a.persona ? a.persona.persona_id : null);
        console.log('ID Personas extraídos:', idPersonas);
        if (idPersonas.includes(this.idPersona)) {
          const artista = artistas.find(a => a.persona?.persona_id === this.idPersona);
          if (artista) {
            this.idArtista = artista.idArtista;
            console.log('ID Artista Encontrado:', this.idArtista);
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

  solicitarRevision(): void {
    if (this.obraForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'error');
      return;
    }

    const fechaRealizacion = new Date(this.obraForm.value.fecha_realizacion);
    const fechaFormateada = fechaRealizacion.toISOString().split('T')[0];

    const obraData = {
      titulo: this.obraForm.value.titulo,
      fecha_realizacion: fechaFormateada,
      dimensiones: this.obraForm.value.dimensiones,
      id_tecnica: this.obraForm.value.id_tecnica,
      id_artista: this.idArtista,
      cantidad_visualizaciones: 0,
      precio: 0.0,
      ruta_imagen: this.obraForm.value.imagen,
      stock: 1,
    };

    this.obraDeArteService.crearObra(obraData).subscribe(
      async (result: any) => {
        console.log('Obra creada con ID:', result.titulo);
        Swal.fire('Éxito', 'La Obra de Arte fue creada.', 'success');
        this.titulo = result.titulo;
        this.getObrasDeArte();
      },
      error => {
        console.error('Error al crear la obra:', error);
        Swal.fire('Error', 'Hubo un problema al crear la obra.', 'error');
      }
    );
  }

  async buscarObraPorTitulo(titulo: string): Promise<void> {
    try {
      const obraEncontrada = this.obras.find(obra => {
        return obra.titulo === titulo;
      });
      if (obraEncontrada) {
        console.log('Obra encontrada:', obraEncontrada);
        console.log('ID de la obra:', obraEncontrada.obraId);
        console.log('Título de la obra:', obraEncontrada.titulo);
        this.crearEvaluacionArtistica(obraEncontrada.obraId);
      } else {
        console.error('No se encontró la obra con el título proporcionado:', titulo);
        Swal.fire('Error', 'No se pudo encontrar la obra con el título proporcionado.', 'error');
      }
    } catch (err) {
      console.error('Error al obtener las obras o crear las evaluaciones:', err);
      Swal.fire('Error', 'Hubo un problema al buscar la obra y crear las evaluaciones.', 'error');
    }
  }

  crearEvaluacionArtistica(idObra: number): void {
    const evaluacionArtistica = {
      idObra: idObra,
      idEspecialista: this.getEspecialistaId(),
      fechaEvaluacion: '',
      resultado: 'PENDIENTE',
      motivoRechazo: ''
    };

    this.evaluacionArtisticaService.crearEvaluacion(evaluacionArtistica).subscribe(
      (result: any) => {
        console.log('Evaluación artística creada:', result.idObra);
        this.crearEvaluacionEconomica(idObra);
      },
      error => {
        console.error('Error al crear la evaluación artística:', error);
        Swal.fire('Error', 'Hubo un problema al crear la evaluación artística.', 'error');
      }
    );
  }

  crearEvaluacionEconomica(idObra: number): void {
    const evaluacionEconomica = {
      idObra: idObra,
      idEspecialista: this.getEspecialistaId(),
      precioVenta: 0,
      porcentajeGanancia: 0,
      fechaEvaluacion: '',
      resultado: 'PENDIENTE',
      motivoRechazo: ''
    };

    this.evaluacionEconomicaService.crearEvaluacion(evaluacionEconomica).subscribe(
      (result: any) => {
        console.log('Evaluación económica creada:', result.idObra);
        this.router.navigate(['/estado-evaluaciones']);
      },
      error => {
        console.error('Error al crear la evaluación económica:', error);
        Swal.fire('Error', 'Hubo un problema al crear la evaluación económica.', 'error');
      }
    );
  }

  getEspecialistaId(): number {
    return 3;
  }
}

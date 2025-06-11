import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TecnicaService } from '../../service/ts/tecnica.service'; // Servicio para obtener técnicas
import { ObraDeArteService } from '../../service/ts/obradearte.service'; // Servicio para crear obra
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
  idPersona: number = 0; // Inicializa en 0 para ser asignado desde el token
  idArtista: number = 0; // Inicializa en 0 para ser asignado después de obtener los datos

  constructor(
    private tecnicaService: TecnicaService,
    private obraDeArteService: ObraDeArteService, // Servicio para crear obra
    private router: Router,
    private tokenService: TokenService, // Inyectamos TokenService
    private artistaService: ArtistaService, // Inyectamos ArtistaService
    private evaluacionArtisticaService: EvaluacionArtisticaService, // Servicio para evaluaciones artísticas
    private evaluacionEconomicaService: EvaluacionEconomicaService // Servicio para evaluaciones económicas
  ) { 
    // Inicialización del FormGroup dentro del constructor
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
    this.idPersona = this.tokenService.getUserId(); // Obtener el ID del artista del token
    console.log('ID Persona:', this.idPersona); // Verificar que el ID se obtiene correctamente

    // Ahora obtener el ID del Artista
    this.getArtistaByIdPersona();
  }

  // Obtener todas las técnicas
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

  // Obtener todas las obras
  getObrasDeArte(): void {
    this.obraDeArteService.obtenerTodasObras().subscribe({
      next: (data) => {
        this.obras = data;
        console.log('Obras cargadas:', this.obras);
      },
      error: (err) => {
        this.obras = [];
        console.error('Error al cargar Obras', err);
        Swal.fire('Error', 'Hubo un problema al cargar las Obras.', 'error');
      }
    });
  }

  // Obtener el Artista por el idPersona que está en el Token
  getArtistaByIdPersona(): void {
    this.artistaService.obtenerTodosArtistas().subscribe({
      next: (artistas) => {
        console.log('Artistas obtenidos:', artistas); // Verifica la estructura de los datos

        // Extraemos los id_persona de los artistas y los almacenamos en un array
        const idPersonas = artistas.map(a => a.persona ? a.persona.persona_id : null); // Verifica si `persona` existe antes de acceder

        console.log('ID Personas extraídos:', idPersonas); // Verifica los ID de las personas

        // Verificamos si el idPersona actual está en los idPersonas
        if (idPersonas.includes(this.idPersona)) {
          // Si encontramos el idPersona, buscamos al artista correspondiente
          const artista = artistas.find(a => a.persona?.persona_id === this.idPersona); // Aseguramos que `persona` exista
          if (artista) {
            this.idArtista = artista.idArtista; // Asignamos el idArtista
            console.log('ID Artista Encontrado:', this.idArtista); // Verificar el ID Artista encontrado
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

  // Función para solicitar revisión de la obra
  solicitarRevision(): void {
    if (this.obraForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'error');
      return;
    }

    const fechaRealizacion = new Date(this.obraForm.value.fecha_realizacion);
    const fechaFormateada = fechaRealizacion.toISOString().split('T')[0]; // Formato correcto: yyyy-MM-dd

    const obraData = {
      titulo: this.obraForm.value.titulo,
      fecha_realizacion: fechaFormateada, // Aseguramos que la fecha esté en el formato correcto
      dimensiones: this.obraForm.value.dimensiones,
      id_tecnica: this.obraForm.value.id_tecnica,
      id_artista: this.idArtista,  // Asignado automáticamente desde el token
      cantidad_visualizaciones: 0,  // Asignamos automáticamente 0
      ruta_imagen: this.obraForm.value.imagen,
      stock: 1,
    };

    // Llamar al servicio para crear la obra
    this.obraDeArteService.crearObra(obraData).subscribe(
      (result: any) => {     
        console.log('Obra creada con ID:', result.titulo);
        Swal.fire('Éxito', 'La Obra de Arte fue creada.', 'success'); // Una vez creada la obra, buscarla por el título para obtener su ID 
        this.buscarObraPorTitulo(result.titulo);
       // this.router.navigate(['/estado-evaluaciones']); // Redirigir a la pantalla de Estado de Evaluaciones
      },
      error => {
        console.error('Error al crear la obra:', error);
        Swal.fire('Error', 'Hubo un problema al crear la obra.', 'error');
      }
    );
  }

  async buscarObraPorTitulo(titulo: string): Promise<void> {
    try {
      // Esperar 5 segundos antes de obtener las obras
      setTimeout(() => {
        this.getObrasDeArte(); // Llamamos al servicio para obtener las obras después de 5 segundos

        // Luego de obtener las obras, esperamos otros 5 segundos antes de comparar el título
        setTimeout(() => {
          // Ahora que las obras están cargadas, realizamos la comparación
          const obraEncontrada = this.obras.find(obra => {
            console.log('Comparando:', obra.titulo, 'con', titulo); // Mostrar los títulos que se están comparando
            return obra.titulo === titulo;
          });

          if (obraEncontrada) {
            console.log('Obra encontrada:', obraEncontrada);

            // Mostrar los detalles de la obra encontrada
            console.log('ID de la obra:', obraEncontrada.obraId); // Mostrar el ID de la obra que se encontró
            console.log('Título de la obra:', obraEncontrada.titulo); // Mostrar el título de la obra

            // Crear las evaluaciones con el idObra encontrado
            this.crearEvaluacionArtistica(obraEncontrada.obraId);
            this.crearEvaluacionEconomica(obraEncontrada.obraId);

            this.router.navigate(['/estado-evaluaciones']); // Redirigir a la pantalla de Estado de Evaluaciones
          } else {
            console.error('No se encontró la obra con el título proporcionado:', titulo);
            Swal.fire('Error', 'No se pudo encontrar la obra con el título proporcionado.', 'error');
          }
        }, 5000); // Esperar otros 5 segundos antes de hacer la comparación
      }, 5000); // Esperar 5 segundos antes de obtener las obras
    } catch (err) {
      console.error('Error al obtener las obras o crear las evaluaciones:', err);
      Swal.fire('Error', 'Hubo un problema al buscar la obra y crear las evaluaciones.', 'error');
    }
  }


  // Crear Evaluación Artística
  crearEvaluacionArtistica(idObra: number): void {
    const evaluacionArtistica = {
      idObra: idObra,
      idEspecialista: this.getEspecialistaId(),
      fechaEvaluacion: '',
      resultado: '',
      motivoRechazo: ''
    };
    
    this.evaluacionArtisticaService.crearEvaluacion(evaluacionArtistica).subscribe(
      (result: any) => {
        console.log('Evaluación artística creada:', result.idObra);
      },
      error => {
        console.error('Error al crear la evaluación artística:', error);
        Swal.fire('Error', 'Hubo un problema al crear la evaluación artística.', 'error');
      }
    );
  }

  // Crear Evaluación Económica
  crearEvaluacionEconomica(idObra: number): void {
    const evaluacionEconomica = {
      idObra: idObra,
      idEspecialista: this.getEspecialistaId(),
      precioVenta: 0,
      porcentajeGanancia: 0,
      fechaEvaluacion: '',
      resultado: '',
      motivoRechazo: ''
    };

    this.evaluacionEconomicaService.crearEvaluacion(evaluacionEconomica).subscribe(
      (result: any) => {
        console.log('Evaluación económica creada:', result.idObra);
      },
      error => {
        console.error('Error al crear la evaluación económica:', error);
        Swal.fire('Error', 'Hubo un problema al crear la evaluación económica.', 'error');
      }
    );
  }

  // Obtener el ID del Especialista basado en la técnica
  getEspecialistaId(): number {
    // Implementa la lógica para obtener el especialista basado en la técnica seleccionada
    // Esto debería estar basado en la relación de la técnica seleccionada con los especialistas disponibles
    return 3;  // Esto es un ejemplo, deberías implementar la lógica según tu aplicación
  }
}

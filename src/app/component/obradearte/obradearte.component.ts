import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObraDeArteService } from '../../service/obradearte.service';
import { TecnicaService} from '../../service/tecnica.service';
import { ArtistaService} from '../../service/artista.service'; // Nuevo servicio para artistas
import { IObraDeArteRequest } from '../../model/obradearte-request';
import { IObraDeArteResponse } from '../../model/obradearte-response';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpEventType } from '@angular/common/http';
import { IArtistaResponse } from '../../model/artista-response';
import { ITecnicaResponse } from '../../model/tecnica-response';

@Component({
  selector: 'app-obradearte',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './obradearte.component.html',
  styleUrls: ['./obradearte.component.css']
})
export class ObradearteComponent {
  obraForm: FormGroup;
  obras: IObraDeArteResponse[] = [];
  tecnicas: ITecnicaResponse[] = [];
  artistas: IArtistaResponse[] = [];
  isEdited = false;
  obraSeleccionada?: IObraDeArteResponse;
  archivoSeleccionado?: File;
  imagenError = '';
  loading = false;

  constructor(
    private obraService: ObraDeArteService,
    private tecnicaService: TecnicaService,
    private artistaService: ArtistaService // Inyección de servicio artistas
  ) {
      this.obraForm = new FormGroup({
        titulo: new FormControl('', Validators.required),
        fecha_realizacion: new FormControl('', Validators.required),
        dimensiones: new FormControl('', Validators.required),
        id_tecnica: new FormControl('', Validators.required),
        id_artista: new FormControl('', Validators.required),  // Valor fijo de prueba
        precio: new FormControl(200, [Validators.required, Validators.min(0)])
      });
  }

  ngOnInit(): void {
    this.cargarObras();
    this.cargarTecnicas();
    this.cargarArtistas();
  }

  cargarObras() {
    this.obraService.obtenerTodasObras().subscribe(data => this.obras = data);
  }

  cargarTecnicas() {
    this.tecnicaService.obtenerTodas().subscribe({
      next: data => this.tecnicas = data,
      error: () => {
        this.tecnicas = [];
        console.error('Error al cargar técnicas');
      }
    });
  }

  cargarArtistas() {
    this.artistaService.getArtista().subscribe({
      next: (data) => {
        this.artistas = data,
        console.log('Artistas cargados:', this.artistas); // Para depurar
      },
      error: (err) => {
        this.artistas = [];
        console.error('Error al cargar artistas', err);
      }
    });
  }

  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.imagenError = 'Solo se permiten archivos JPEG o PNG.';
        this.archivoSeleccionado = undefined;
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.imagenError = 'El archivo debe ser menor a 10MB.';
        this.archivoSeleccionado = undefined;
        return;
      }
      this.imagenError = '';
      this.archivoSeleccionado = file;
    }
  }

  limpiarFormulario() {
    this.obraForm.reset();
    this.isEdited = false;
    this.archivoSeleccionado = undefined;
    this.imagenError = '';
    this.obraSeleccionada = undefined;
  }

  guardarObra() {
    if (this.obraForm.invalid) {
      Swal.fire('Error', 'Completa correctamente el formulario.', 'error');
      return;
    }

    if (!this.archivoSeleccionado && !this.isEdited) {
      Swal.fire('Error', 'Por favor, ingresa una imagen válida.', 'error');
      return;
    }
    
    this.loading = true;
    const obraData: IObraDeArteRequest = this.obraForm.value;

    // Enviar obra con el id_artista del formulario
    this.obraService.registrarObra({
      ...obraData,
      ruta_imagen: ''
    }).subscribe({
      next: obraCreada => {
        this.obraService.subirImagen(obraCreada.obraId, this.archivoSeleccionado!).subscribe({
          next: event => {
            if (event.type === HttpEventType.Response) {
              Swal.fire('Éxito', 'Obra y imagen subidas correctamente', 'success');
              this.limpiarFormulario();
              this.cargarObras();
              this.loading = false;
            }
          },
          error: () => {
            Swal.fire('Error', 'Obra creada pero falló la subida de la imagen', 'error');
            this.loading = false;
          }
        });
      },
      error: () => {
        Swal.fire('Error', 'Error al crear la obra', 'error');
        this.loading = false;
      }
    });
  }

  private subirImagenYActualizarLista(idObra: number) {
    this.obraService.subirImagen(idObra, this.archivoSeleccionado!).subscribe({
      next: event => {
        if (event.type === HttpEventType.Response) {
          Swal.fire('Éxito', this.isEdited ? 'Obra actualizada correctamente' : 'Obra creada correctamente', 'success');
          this.finalizarGuardado();
        }
      },
      error: () => {
        Swal.fire('Error', 'Obra creada pero falló la subida de la imagen', 'error');
        this.loading = false;
      }
    });
  }

  private finalizarGuardado() {
    this.limpiarFormulario();
    this.cargarObras();
    this.loading = false;
  }

  seleccionarObraParaEditar(obra: IObraDeArteResponse) {
    this.isEdited = true;
    this.obraSeleccionada = obra;
    this.obraForm.patchValue({
      titulo: obra.titulo,
      fecha_realizacion: obra.fechaRealizacion,
      dimensiones: obra.dimensiones,
      id_tecnica: obra.tecnicaId,
      id_artista: obra.artistaId,
      precio: obra.precio
    });
    this.archivoSeleccionado = undefined;
    this.imagenError = '';
  }
}

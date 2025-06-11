import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TecnicaService } from '../../service/ts/tecnica.service'; // Servicio para obtener técnicas
import { ObraDeArteService } from '../../service/ts/obradearte.service'; // Servicio para crear obra
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ITecnicaResponse } from '../../model/tecnica-response';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-crear-obra',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.css']
})
export class CrearObraComponent implements OnInit {

  obraForm: FormGroup;
  tecnicas: ITecnicaResponse[] = [];
  idArtista: number = 1; // Esto debe ser extraído del sistema de autenticación

  constructor(
    private tecnicaService: TecnicaService,
    private obraDeArteService: ObraDeArteService, // Servicio para crear obra
    private router: Router
  ) { 
    // Inicialización del FormGroup dentro del constructor
    this.obraForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      fecha_realizacion: new FormControl('', [Validators.required]),
      dimensiones: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      id_tecnica: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getTecnicas();
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
      id_artista: this.idArtista,  // Asignado automáticamente
      precio: this.obraForm.value.precio,
      cantidad_visualizaciones: 0,  // Asignamos automáticamente 0
      ruta_imagen: this.obraForm.value.imagen,
      stock: 1,
    };

    // Llamar al servicio para crear la obra
    this.obraDeArteService.crearObra(obraData).subscribe(
      (result: any) => {
        Swal.fire('Éxito', 'La obra fue creada y está en espera de revisión.', 'success');
        this.router.navigate(['/estado-evaluaciones']); // Redirigir a la pantalla de Estado de Evaluaciones
      },
      error => {
        console.error('Error al crear la obra:', error);
        Swal.fire('Error', 'Hubo un problema al crear la obra.', 'error');
      }
    );
  }
}

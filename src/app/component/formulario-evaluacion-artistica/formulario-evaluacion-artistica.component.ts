import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriterioEvaluacionArtisticaService } from '../../service/ts/criterio-evaluacion-artistica.service'; 
import { ICriterioEvaluacionArtisticaResponse } from '../../model/criterio-evaluacion-artistica-response';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenService } from '../../JWT/token.service';
import { EspecialistaService } from '../../service/ts/especialista.service';

@Component({
  selector: 'app-evaluacion-formulario',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './formulario-evaluacion-artistica.component.html',
  styleUrls: ['./formulario-evaluacion-artistica.component.css']
})
export class EvaluacionFormularioComponent implements OnInit {
  tecnicaId: number = 0;
  criterios: ICriterioEvaluacionArtisticaResponse[] = [];
  evaluacionForm: FormGroup;
  idEspecialista: number = 0;
  idPersona: number = 0;

  constructor(
    private route: ActivatedRoute,
    private criterioService: CriterioEvaluacionArtisticaService,
    private tokenService: TokenService,
    private especialistaService: EspecialistaService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { 
       this.evaluacionForm = this.fb.group({});
  }


  ngOnInit(): void {
    this.idPersona = this.tokenService.getUserId(); // Obtener el ID del especialista desde el token
    console.log('Error al obtener especialistas', this.idPersona);
    this.getEspecialistaByIdPersona();
  }

  // Obtener el especialista por el ID de la persona
  getEspecialistaByIdPersona(): void {
    console.log('1');
    this.especialistaService.obtenerTodosEspecialistas().subscribe({
      next: (especialistas) => {
        const idPersonas = especialistas.map(e => e.persona ? e.persona.persona_id : null);
        if (idPersonas.includes(this.idPersona)) {
          const especialista = especialistas.find(e => e.persona?.persona_id === this.idPersona);
          if (especialista) {
            this.idEspecialista = especialista.idEspecialista;
            this.tecnicaId = especialista.tecnica.idTecnica;
            console.log('idtecnica', this.tecnicaId);
            this.CargarCriteriosporTecnica(); // Cargar criterios después de obtener la técnica
          }
        }
      },
      error: (err) => {
        console.error('Error al obtener especialistas', err);
      }
    });
  }

  CargarCriteriosporTecnica(): void {
    console.log('idtecnica2', this.tecnicaId);
    this.criterioService.getCriteriosByTecnica(this.tecnicaId).subscribe(
      (criterios) => {
        this.criterios = criterios;
        console.log('Criterios cargados', this.criterios); // Verifica si los criterios se cargan bien
        this.buildForm(); // Llama a buildForm solo después de obtener los criterios
        this.cdRef.detectChanges(); // Forzar actualización de la vista
      },
      (error) => {
        console.error('Error al cargar los criterios', error);
      }
    );
  }

buildForm(): void {
  const group: { [key: string]: any } = {}; // Crear un grupo de controles dinámicos
  
  // Recorrer cada criterio y agregarlo al grupo de controles
  this.criterios.forEach((criterio) => {
    console.log('Cargando criterios:', this.criterios); // Imprimir el nombre del criterio
    console.log('Cargando criterio:', criterio.nombreCriterio); // Imprimir el nombre del criterio
    group[criterio.idCriterioEvaluacionArtistica.toString()] = this.fb.control('', Validators.required);
  });
  
  this.evaluacionForm = this.fb.group(group); // Asignar el grupo dinámico al formulario
  console.log('Formulario construido:', this.evaluacionForm); // Imprimir el formulario completo
}

  onSubmit(): void {
    if (this.evaluacionForm.valid) {
      // Aquí puedes enviar los datos del formulario
      console.log('Formulario enviado', this.evaluacionForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriterioEvaluacionArtisticaService } from '../../service/ts/criterio-evaluacion-artistica.service'; 
import { ICriterioEvaluacionArtisticaResponse } from '../../model/criterio-evaluacion-artistica-response';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

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

  constructor(
    private route: ActivatedRoute,
    private criterioService: CriterioEvaluacionArtisticaService,
    private fb: FormBuilder
  ) { 
    // Inicializar el formulario vacío
    this.evaluacionForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Obtener el ID de la técnica desde la URL
    this.route.params.subscribe(params => {
      this.tecnicaId = +params['tecnicaId'];  // Suponiendo que la URL contiene el ID de la técnica
      this.CargarCriteriosporTecnica();  // Cargar los criterios según la técnica
    });
  }

  CargarCriteriosporTecnica(): void {
    this.criterioService.getCriteriosByTecnica(this.tecnicaId).subscribe(
      (criterios) => {
        this.criterios = criterios;
        this.buildForm();
      },
      (error) => {
        console.error('Error al cargar los criterios', error);
      }
    );
  }

  buildForm(): void {
    // Crear un control en el formulario por cada criterio
    this.criterios.forEach((criterio) => {
      this.evaluacionForm.addControl(criterio.idCriterioEvaluacionArtistica.toString(), this.fb.control('', Validators.required));
    });
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

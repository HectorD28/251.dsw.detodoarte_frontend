import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramarExposicionService } from '../../service/ts/programar-exposicion.service';
import { IExposicionRequest } from '../../model/exposicion-request';
import { IExposicionResponse } from '../../model/exposicion-response';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ISolicitudExposicionResponse } from '../../model/solicitud-exposicion-response';
import { SolicitudExposicionService } from '../../service/ts/solicitud-exposicion.service';

@Component({
  selector: 'app-programar-exposicion',
  templateUrl: './programar-exposicion.component.html',
  styleUrl: './programar-exposicion.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProgramarExposicionComponent {
  form: FormGroup;
  respuesta?: IExposicionResponse;
  error?: string;
  solicitudes: ISolicitudExposicionResponse[] = []; // <-- NUEVO
  exposicionesProgramadas: IExposicionResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private exposicionService: ProgramarExposicionService,
    private solicitudExposicionService: SolicitudExposicionService // <-- NUEVO

  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      tipo_exposicion: ['', Validators.required],
      idSolicitudExposicion: [null, Validators.required],
    });

    this.exposicionService.obtenerExposicionesProgramadas().subscribe({
      next: (exps) => this.exposicionesProgramadas = exps
    });

    // Cargar solicitudes al iniciar
    this.solicitudExposicionService.obtenerSolicitudes().subscribe({
      next: (sols) => this.solicitudes = sols
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    // Validación personalizada: fecha_fin > fecha_inicio
    const { fecha_inicio, fecha_fin } = this.form.value;
    if (fecha_fin < fecha_inicio) {
      Swal.fire({
        icon: 'warning',
        title: 'Fechas inválidas',
        text: 'La fecha de fin debe ser posterior a la fecha de inicio.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const data: IExposicionRequest = this.form.value;
    console.log('Datos enviados:', data);
    this.exposicionService.programarExposicion(data).subscribe({
      next: (resp) => {
        this.respuesta = resp;
        this.error = undefined;
        this.form.reset();
        Swal.fire({
          icon: 'success',
          title: '¡Exposición programada!',
          text: 'La exposición se programó correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        this.error = 'Error al programar la exposición';
        this.respuesta = undefined;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo programar la exposición.',
          confirmButtonText: 'Aceptar'
        });
      },
    });
  }
}
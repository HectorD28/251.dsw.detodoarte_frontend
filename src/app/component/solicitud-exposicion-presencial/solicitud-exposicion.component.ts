import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SolicitudExposicionPresencialService } from '../../service/ts/solicitud-exposicion-presencial.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-exposicion-presencial',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './solicitud-exposicion-presencial.component.html',
  styleUrls: ['./solicitud-exposicion-presencial.component.css']
})
export class SolicitudExposicionPresencialComponent{

  solicitudPresencialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudExposicionPresencialService: SolicitudExposicionPresencialService,
    private router: Router
  ) {
    this.solicitudPresencialForm = this.fb.group({
      idArtista: ['', Validators.required],
      fechaEmisionSolicitud: ['', Validators.required],
      estadoSolicitud: ['', Validators.required],
      comentarios: ['', Validators.required],
      fechaRecepcionSolicitud: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  solicitarExposicionPresencial(): void {
    if (this.solicitudPresencialForm.invalid) {
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];

    const SolicitudPresencial = {
      idArtista: this.solicitudPresencialForm.value.idArtista,
      fechaEmisionSolicitud: fechaActual,
      estadoSolicitud: this.solicitudPresencialForm.value.estadoSolicitud,
      comentarios: this.solicitudPresencialForm.value.comentarios,
      fechaRecepcionSolicitud: this.solicitudPresencialForm.value.fechaRecepcionSolicitud
    }

    this.solicitudExposicionPresencialService.crearSolicitud(SolicitudPresencial).subscribe(
      (result: any) => {
        Swal.fire('Éxito', 'La solicitud de exposición fue creada.', 'success');
        this.router.navigate(['/estado-solicitud-presencial']); // Redirigir a la pantalla de Estado de Evaluaciones
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al crear la solicitud de exposición.', 'error');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SolicitudExposicionPresencialService } from '../../service/ts/solicitud-exposicion-presencial.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-solicitud-exposicion-presencial',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './solicitud-exposicion.component.html',
  styleUrls: ['./solicitud-exposicion.component.css']
})
export class SolicitudExposicionPresencialComponent implements OnInit {

  solicitudPresencialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudExposicionPresencialService: SolicitudExposicionPresencialService
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
      EstadoSolicitud: this.solicitudPresencialForm.value.EstadoSolicitud,
      comentarios: this.solicitudPresencialForm.value.comentarios,
      fechaRecepcionSolicitud: this.solicitudPresencialForm.value.fechaRecepcionSolicitud
    }

    this.solicitudExposicionPresencialService.crearSolicitud(SolicitudPresencial).subscribe(
      (result: any) => {
        Swal.fire('Éxito', 'La solicitud de exposición fue creada.', 'success');
        // Redirigir a la pantalla de Estado de Exposición
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al crear la solicitud de exposición.', 'error');
      }
    );
  }
}

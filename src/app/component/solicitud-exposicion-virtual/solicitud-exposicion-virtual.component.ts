import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExposicionVirtualService } from '../../service/ts/exposicion-virtual.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-solicitud-exposicion-virtual',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './solicitud-exposicion-virtual.component.html',
  styleUrls: ['./solicitud-exposicion-virtual.component.css']
})
export class SolicitudExposicionVirtualComponent implements OnInit {

  solicitudVirtualForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exposicionVirtualService: ExposicionVirtualService
  ) {
    this.solicitudVirtualForm = this.fb.group({
      fechaPublicacion: ['', Validators.required],
      estadoPublicacion: ['', Validators.required],
      urlPublicacion: ['', Validators.required],
      comentarios: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  solicitarExposicionVirtual(): void {
    if (this.solicitudVirtualForm.invalid) {
      return;
    }

    const solicitudData = {
      fechaPublicacion: this.solicitudVirtualForm.value.fechaPublicacion,
      estadoPublicacion: this.solicitudVirtualForm.value.estadoPublicacion,
      urlPublicacion: this.solicitudVirtualForm.value.urlPublicacion,
      comentarios: this.solicitudVirtualForm.value.comentarios
    };

    this.exposicionVirtualService.crearExposicion(solicitudData).subscribe(
      (result: any) => {
        Swal.fire('Éxito', 'La solicitud de exposición virtual fue creada.', 'success');
        // Redirigir a la pantalla de Estado de Exposición
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al crear la solicitud de exposición virtual.', 'error');
      }
    );
  }
}

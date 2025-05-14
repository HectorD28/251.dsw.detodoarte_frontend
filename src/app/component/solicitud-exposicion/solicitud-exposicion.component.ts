import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudExposicionService } from '../../service/solicitud-exposicion.service';

@Component({
  selector: 'app-solicitud-exposicion',
  templateUrl: './solicitud-exposicion.component.html'
})
export class SolicitudExposicionComponent {
  solicitudForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudExposicionService
  ) {
    this.solicitudForm = this.fb.group({
      artistaId: ['', Validators.required],
      comentarios: [''],
      obraIds: [[], Validators.required]
    });
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      this.solicitudService.crearSolicitud(this.solicitudForm.value)
        .subscribe({
          next: (resp) => alert('Solicitud creada correctamente'),
          error: (err) => alert('Error al crear la solicitud')
        });
    }
  }
}

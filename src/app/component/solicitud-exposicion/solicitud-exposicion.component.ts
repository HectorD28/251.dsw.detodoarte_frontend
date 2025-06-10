import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { SolicitudExposicionService } from '../../service/ts/solicitud-exposicion.service';

@Component({
  selector: 'app-solicitud-exposicion',
  templateUrl: './solicitud-exposicion.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './solicitud-exposicion.component.css'

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

  onObraIdsChange(event: any) {
    const value = event.target.value;
    const ids = value.split(',').map((id: string) => Number(id.trim())).filter((id: number) => !isNaN(id));
    this.solicitudForm.patchValue({ obraIds: ids });
  }
}

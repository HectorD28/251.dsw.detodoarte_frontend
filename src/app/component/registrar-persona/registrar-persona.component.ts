import { ArtistaService } from './../../service/artista.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from '../../service/persona.service';
import { IArtistaResponse } from '../../model/artista-response';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPersonaRequest } from '../../model/persona-request';
import { IArtistaRequest } from '../../model/artista-request';



@Component({
  selector: 'app-registrar-persona',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css'
})
export class RegistrarPersonaComponent {
  personaArray: IPersonaResponse[] = [];
  personaRequest: IPersonaRequest = {} as IPersonaRequest;
  artistaArray: IArtistaResponse[] = [];
  artistaRequest: IArtistaRequest = {} as IArtistaRequest;
  personaForm: FormGroup;
  artistaForm: FormGroup;
  page: number = 1;
  isEdited:boolean = false;
  constructor(
    private personaService: PersonaService,
    private artistaService: ArtistaService,
  ) {

    this.artistaForm = new FormGroup({
      categoria: new FormControl('',[Validators.required,]),
      id_artista: new FormControl(''),

      persona_id: new FormControl(''),

    });

    this.personaForm = new FormGroup({
      
      categoria: new FormControl('',[Validators.required,]),
        
      id_artista: new FormControl(''),
      persona_id: new FormControl(''),
      dni: new FormControl('', 
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
        ]),
      nombre_completo: new FormControl('', 
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      apellido_paterno: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      apellido_materno: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      direccion_residencia: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      sexo: new FormControl('',
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      telefono: new FormControl('',
        [Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
      correo_electronico: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      contrasena: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
    });
  }


  ngOnInit() :void{
    this.isEdited = false;
    this.personaForm.reset();
    this.obtenerTodasPersonas();
  }

  obtenerTodasPersonas() {
    this.personaService.obtenerTodasPersonas().subscribe((result: any) => {
      this.personaArray = result;
      
    });
  }

  setPersonaRequest() :void{
    this.personaRequest.persona_id=
    this.personaForm.get('persona_id')?.value;
    this.personaRequest.dni=
    this.personaForm.get('dni')?.value;
    this.personaRequest.nombre_completo=
    this.personaForm.get('nombre_completo')?.value;
    this.personaRequest.apellido_paterno=
    this.personaForm.get('apellido_paterno')?.value;
    this.personaRequest.apellido_materno=
    this.personaForm.get('apellido_materno')?.value;
    this.personaRequest.direccion_residencia=
    this.personaForm.get('direccion_residencia')?.value;
    this.personaRequest.sexo=
    this.personaForm.get('sexo')?.value;
    this.personaRequest.telefono=
    this.personaForm.get('telefono')?.value;
    this.personaRequest.correo_electronico=
    this.personaForm.get('correo_electronico')?.value;
    this.personaRequest.contrasena=
    this.personaForm.get('contrasena')?.value;
}

  setArtistaRequest() :void{
    this.artistaRequest.id_artista=
    this.personaForm.get('id_artista')?.value;
    
    this.artistaRequest.persona_id=
    this.personaForm.get('persona_id')?.value; 
}

registrarPersona() : void{
  this.setPersonaRequest();
  this.setArtistaRequest();
  if(this.isEdited) {
    this.actualizarPersona();
  }else this.insertarPersona();
}


insertarPersona(): void {
    this.setPersonaRequest();
    console.log('personaRequest', this.personaRequest);
    console.log('artistaRequest', this.artistaRequest);


    Swal.fire({
    title: '¿Está seguro de registrar los datos del usuario?',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Sí',
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.personaService.registrarPersona(this.personaRequest).subscribe(
        (result: any) => {
          // Aquí ya tienes la persona registrada, result debería contener persona_id
          this.ngOnInit();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Registrar Usuario',
            text: '¡Se registraron exitosamente los datos del usuario!',
          });

          if (this.personaForm.get('categoria')?.value === 'artista') {
            this.artistaRequest = {
              id_artista: 0, 
              persona_id: result.persona_id
            };            
            this.artistaService.registrarArtista(this.artistaRequest).subscribe(
              (res) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Artista Registrado',
                  text: 'La persona también fue registrada como artista exitosamente.',
                });
              },
              (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se pudo registrar como artista.',
                });
              }
            );
          }
        },
        (err: any) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia',
            text: '¡Error al registrar el usuario!',
          });
        }
      );
    }
  });
  } 






















actualizarPersona() : void{
  this.personaService
    .actualizarPersona(this.personaRequest)
    .subscribe((result: any) => {
      this.ngOnInit();
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Persona actualizada correctamente',
      });
    },
    (error: any) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Advertencia....',
        text: 'Error al actualizar la persona',
      });
    }
  );
}










  eliminarPersona(personaResponse: IPersonaResponse): void {
    this.personaRequest.persona_id = personaResponse.persona_id;
    Swal.fire({
      title: 'Esta seguro de eliminar al usuario seleccionado?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersona(this.personaRequest).subscribe(
          (result: any) => {
            console.log('eliminarPersona', result);
            this.ngOnInit();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'eliminarUsuario....',
              text: '!Se eliminó exitosamente al usuario!',
            });
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia....',
              text: '!Ah ocurrido un error al eliminar el usuario!',
            });
          } //cierre del error
        );
      }
    });
  }
  editarPersona(personaResponse: IPersonaResponse): void {
    Swal.fire({
      title: 'Esta seguro de editar al usuario seleccionado?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.patchValue({
          persona_id: personaResponse.persona_id,
          dni: personaResponse.dni,
          nombre_completo: personaResponse.nombre_completo,
          apellido_paterno: personaResponse.apellido_paterno,
          apellido_materno: personaResponse.apellido_materno,
          direccion_residencia: personaResponse.direccion_residencia,
          sexo: personaResponse.sexo,
          telefono: personaResponse.telefono,
          correo_electronico: personaResponse.correo_electronico,
          contrasena: personaResponse.contrasena,
          
        });
        this.isEdited = true;
      }
    });
  }
}


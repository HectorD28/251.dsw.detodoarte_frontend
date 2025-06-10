import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IPersonaResponse } from '../../model/persona-response';
import { IPersonaRequest } from '../../model/persona-request';

import { PersonaService } from '../../service/ts/persona.service';
import { IArtistaResponse } from '../../model/artista-response';
import { IArtistaRequest } from '../../model/artista-request';
import { ArtistaService } from '../../service/ts/artista.service';


import { IEspecialistaResponse } from '../../model/especialista-response';
import { IEspecialistaRequest } from '../../model/especialista-request';
import { EspecialistaService } from '../../service/ts/especialista.service';

import { ITecnicaResponse } from './../../model/tecnica-response';
import { TecnicaService } from '../../service/ts/tecnica.service';

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';



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
  especialistaArray: IEspecialistaResponse[] = [];
  especialistaRequest: IEspecialistaRequest = {} as IEspecialistaRequest;
  tecnicaArray: ITecnicaResponse[] = [];



  personaForm: FormGroup;
  artistaForm: FormGroup;
  especialistaForm: FormGroup;


    isEspecialista = false;


  page: number = 1;
  isEdited:boolean = false;
  constructor(
    private personaService: PersonaService,
    private artistaService: ArtistaService,
    private especialistaService: EspecialistaService,
    private tecnicaService: TecnicaService,
  ) {

    this.artistaForm = new FormGroup({
      
    });

    this.especialistaForm = new FormGroup({
      tecnicaId: new FormControl('',[Validators.required,]),

    });

    this.personaForm = new FormGroup({

      categoria: new FormControl('', [Validators.required]),

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
      rol: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      username: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),

              tecnicaId: new FormControl('',[Validators.required,]),


    });
  }



  // Cambiar según la categoría seleccionada
  onCategoryChange(): void {
    const categoria = this.personaForm.get('rol')?.value;
    this.isEspecialista = categoria === 'ESPECIALISTA';
  }


  ngOnInit() :void{
    this.isEdited = false;
    this.personaForm.reset();
    this.cargarTecnicas();
   // this.obtenerTodasPersonas();
  }

//  obtenerTodasPersonas() {
//    this.personaService.obtenerTodasPersonas().subscribe((result: any) => {
//      this.personaArray = result;
//      
//    });
// }

  setPersonaRequest() :void{
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
    this.personaRequest.correoElectronico=
    this.personaForm.get('correo_electronico')?.value;
    this.personaRequest.contrasena=
    this.personaForm.get('contrasena')?.value;
    this.personaRequest.rol=
    this.personaForm.get('rol')?.value;
    this.personaRequest.estado=true;
    this.personaRequest.username=
    this.personaForm.get('username')?.value;

    this.especialistaRequest.tecnicaId =
    this.especialistaForm.get('tecnicaId')?.value;

}

//PARA CARGAR LAS TENICAS QUE SE REGISTRAN
  cargarTecnicas(): void {
    this.tecnicaService.obtenerTodasTecnicas().subscribe({
      next: (data) => {
        this.tecnicaArray = data;
        console.log('Técnicas cargadas:', this.tecnicaArray);
      },
      error: () => {
        this.tecnicaArray = [];
        console.error('Error al cargar técnicas');
      }
    });

  }


registrarPersona() : void{
  this.setPersonaRequest();
  if(this.isEdited) {
    
  }else this.insertarPersona();
}


insertarPersona(): void {
    this.setPersonaRequest();

    console.log('personaRequest', this.personaRequest);


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
          this.comprobarTipoPersona(result);
          this.ngOnInit();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Registrar Usuario',
            text: '¡Se registraron exitosamente los datos del usuario!',
          });

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


  comprobarTipoPersona(result:any) : void{
      if (this.personaForm.get('rol')?.value === 'ARTISTA') {
                    this.artistaRequest = {
                      personaId: result.persona_id
                    } as IArtistaRequest;    
                            
                    this.artistaService.crearArtista(this.artistaRequest).subscribe(
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


                  if (this.personaForm.get('rol')?.value === 'ESPECIALISTA') {
                    this.especialistaRequest = {
                      personaId: result.persona_id,
                      tecnicaId: this.personaForm.get('tecnicaId')?.value
                    } as IEspecialistaRequest;    
                            
                    this.especialistaService.registrarEspecialista(this.especialistaRequest).subscribe(
                      (res) => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Especialista Registrado',
                          text: 'El especialista registrado exitosamente.',
                        });
                      },
                      (error) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'No se pudo registrar como especialista.',
                        });
                      }
                    );
                  }
  }





}


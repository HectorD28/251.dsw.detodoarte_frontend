import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from '../../service/ts/persona.service';
import { TokenService } from '../../JWT/token.service';
import { RolesService } from '../../roles/roles.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  public role: string | null = null;
  public idPersona: number;
  public usuario: IPersonaResponse | null = null;

  constructor(
    private roleService: RolesService,
    private personaService: PersonaService,
    private tokenService: TokenService
  ) {
    // Obtiene el rol con el cual se inicio sesión
    this.role = this.roleService.getRole();
    this.idPersona = this.tokenService.getUserId();
  }

  ngOnInit(): void {
    // Cargar datos del usuario desde el servicio usando el ID del token
    if (this.idPersona) {
      this.cargarDatosUsuario(this.idPersona);
    }
  }

  cargarDatosUsuario(id: number): void {
    // Llama al servicio PersonaService para obtener los datos del usuario
    this.personaService.getCliente(id).subscribe({
      next: (data: IPersonaResponse) => {
        this.usuario = data;
        this.prefillForm(); // Rellenar el formulario con los datos obtenidos
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario', err);
      }
    });
  }

  prefillForm(): void {
    if (this.usuario) {
      // Asignar los valores obtenidos del usuario en los campos de perfil
      document.getElementById('username')?.setAttribute('value', this.usuario.username);
      document.getElementById('email')?.setAttribute('value', this.usuario.correoElectronico);
      document.getElementById('address')?.setAttribute('value', this.usuario.direccion);
      document.getElementById('phone')?.setAttribute('value', this.usuario.telefono);
    }
  }

  ngOnDestroy(): void {
    // Limpiar cualquier dato si es necesario cuando el componente se destruye
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from '../../service/ts/persona.service';

import { RolesService } from '../../roles/roles.service';

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPersonaRequest } from '../../model/persona-request';
import { TokenService } from '../../JWT/token.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
    public role : string | null = null;
    public idPersona: number;

  constructor(
    private roleService: RolesService,
    private personaService: PersonaService,
    private tokenService: TokenService
  
  ) {
    //Obtiene el rol con el cual se inicio sesión
    this.role = this.roleService.getRole();
    this.idPersona = this.tokenService.getUserId();

    console.log('PerfilComponent initialized with role:', this.role);
  }
  

}

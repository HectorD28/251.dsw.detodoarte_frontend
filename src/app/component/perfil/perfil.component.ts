import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from '../../service/persona.service';

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPersonaRequest } from '../../model/persona-request';


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}

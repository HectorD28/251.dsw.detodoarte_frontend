import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IUsuarioRegistradoResponse } from '../../../model/usuarios/usuario-registrado-response';
import { UsuarioRegistradoService } from '../../../service/usuarios/usuario-registrado.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ROLES } from '../../../constants/roles';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-registrado',
  imports: [
    CommonModule,
    MatTableModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './usuario-registrado.component.html',
  styleUrls: ['./usuario-registrado.component.css']
})
export class UsuarioRegistradoComponent {
  displayedColumns: string[] = [
    'nombreCompleto', 'apellidoPaterno', 'apellidoMaterno',
    'dni', 'correoElectronico', 'rol', 'telefono', 'modificar'
  ];
  dataSource = new MatTableDataSource<IUsuarioRegistradoResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  roles = Object.values(ROLES); // Importar los roles desde el archivo de constantes
  // Variables para los filtros
  filtroDni: string = '';
  filtroRol: string = '';

  constructor(private usuarioRegistradoService: UsuarioRegistradoService) {}
  
  ngOnInit(): void {
    this.usuarioRegistradoService.obtenerUsuariosRegistrados().subscribe({
      next: (usuarios) => {
        console.log('Usuarios registrados obtenidos:', usuarios);
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator; // Asignar el paginador
      },
      error: () => {
        console.error('Error al obtener usuarios registrados:');
      }
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Asignar el paginador después de la vista
  }

  buscarPorDni() {
    if (this.filtroDni.trim() === '') {
      // Si el campo está vacío, recarga todos los usuarios
      this.usuarioRegistradoService.obtenerUsuariosRegistrados().subscribe({
        next: (usuarios) => this.dataSource.data = usuarios,
        error: () => console.error('Error al obtener usuarios registrados')
      });
      return;
    }

    this.usuarioRegistradoService.obtenerUsuarioRegistradoPorDni(this.filtroDni).subscribe({
      next: (usuario) => this.dataSource.data = usuario ? [usuario] : [],
      error: () => this.dataSource.data = [] // Si no encuentra, muestra vacío
    });
  }

  buscarPorRol() {
    if (this.filtroRol.trim() === '') {
      // Si el campo está vacío, recarga todos los usuarios
      this.usuarioRegistradoService.obtenerUsuariosRegistrados().subscribe({
        next: (usuarios) => this.dataSource.data = usuarios,
        error: () => console.error('Error al obtener usuarios registrados')
      });
      return;
    }

    this.usuarioRegistradoService.obtenerUsuariosRegistradosPorRol(this.filtroRol).subscribe({
      next: (usuarios) => this.dataSource.data = usuarios,
      error: () => this.dataSource.data = [] // Si no encuentra, muestra vacío
    });
  }

  actualizarUsuario(usuario: IUsuarioRegistradoResponse) {
    Swal.fire({
      title: 'Editar usuario',
      html:
  `<div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Nombre Completo:</label>
    <input id="swal-nombre" class="swal2-input" style="width:300px;margin:0;" placeholder="Nombre Completo" value="${usuario.nombreCompleto}">
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Apellido Paterno:</label>
    <input id="swal-apellidoPaterno" class="swal2-input" style="width:300px;margin:0;" placeholder="Apellido Paterno" value="${usuario.apellidoPaterno}">
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Apellido Materno:</label>
    <input id="swal-apellidoMaterno" class="swal2-input" style="width:300px;margin:0;" placeholder="Apellido Materno" value="${usuario.apellidoMaterno}">
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">DNI:</label>
    <input id="swal-dni" 
      class="swal2-input" 
      style="width:300px;margin:0;color:#f0f0f0;" 
      placeholder="DNI" value="${usuario.dni}" disabled>
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Correo Electrónico:</label>
    <input id="swal-correo" class="swal2-input" style="width:300px;margin:0;" placeholder="Correo Electrónico" value="${usuario.correoElectronico}">
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Rol:</label>
    <select id="swal-rol" class="swal2-input" style="width:300px;margin:0;">
      ${this.roles.map(rol => `
        <option value="${rol}" ${rol === usuario.rol ? 'selected' : ''}>${rol}</option>
      `).join('')}
    </select>
  </div>
  <div style="display:flex;align-items:center;margin-bottom:8px;">
    <label style="width:140px;">Teléfono:</label>
    <input id="swal-telefono" class="swal2-input" style="width:300px;margin:0;" placeholder="Teléfono" value="${usuario.telefono}">
  </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        return {
          ...usuario,
          nombreCompleto: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          apellidoPaterno: (document.getElementById('swal-apellidoPaterno') as HTMLInputElement).value,
          apellidoMaterno: (document.getElementById('swal-apellidoMaterno') as HTMLInputElement).value,
          correoElectronico: (document.getElementById('swal-correo') as HTMLInputElement).value,
          rol: (document.getElementById('swal-rol') as HTMLInputElement).value,
          telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.usuarioRegistradoService.actualizarUsuarioRegistrado(result.value).subscribe({
          next: (usuarioActualizado) => {
            Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
            const index = this.dataSource.data.findIndex(u => u.dni === usuarioActualizado.dni);
            if (index !== -1) {
              this.dataSource.data[index] = usuarioActualizado;
              this.dataSource._updateChangeSubscription(); // Actualiza la tabla
            }
          },
          error: () => {
            Swal.fire('Error', 'Error al actualizar el usuario registrado', 'error');
          }
        });
      }
    });
  }

  // Método para eliminar un usuario registrado
  eliminarUsuario(usuario: IUsuarioRegistradoResponse) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperar este usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioRegistradoService.eliminarUsuarioRegistrado(usuario.dni).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
            this.dataSource.data = this.dataSource.data.filter(u => u.dni !== usuario.dni);
          },
          error: () => {
            Swal.fire('Error', 'Error al eliminar el usuario registrado', 'error');
          }
        });
      }
    });
  }

}

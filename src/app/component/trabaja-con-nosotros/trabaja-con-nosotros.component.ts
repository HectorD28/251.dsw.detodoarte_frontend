import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trabaja-con-nosotros',
  imports: [],
  templateUrl: './trabaja-con-nosotros.component.html',
  styleUrl: './trabaja-con-nosotros.component.css'
})
export class TrabajaConNosotrosComponent {

    abrirFormulario() {
        Swal.fire({
          width: '600px', 
          title: 'Postula como Especialista',
          text: 'Por favor, completa el siguiente formulario:',
          html: `
            <input id="dni" type="text" class="swal2-input" placeholder="DNI" />
            <input id="nombre_completo" type="text" class="swal2-input" placeholder="Nombre Completo" />
            <input id="apellido_paterno" type="text" class="swal2-input" placeholder="Apellido Paterno" />
            <input id="apellido_materno" type="text" class="swal2-input" placeholder="Apellido Materno" />
            <input id="direccion_residencia" type="text" class="swal2-input" placeholder="Dirección de Residencia" />
            <select id="sexo" class="swal2-select">
              <option value="" disabled selected>Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            <input id="telefono" type="tel" class="swal2-input" placeholder="Teléfono" />
            <input id="correo_electronico" type="email" class="swal2-input" placeholder="Correo Electrónico" />
            <input id="contrasena" type="password" class="swal2-input" placeholder="Contraseña" />

            <hr />

            <p>Técnicas que conoce el especialista:</p>
            <div style="text-align:left; max-height:150px; overflow-y:auto;">
              <label><input type="checkbox" class="tecnica" value="Pintura"> Pintura</label><br/>
              <label><input type="checkbox" class="tecnica" value="Escultura"> Escultura</label><br/>
              <label><input type="checkbox" class="tecnica" value="Fotografía"> Fotografía</label><br/>
              <label><input type="checkbox" class="tecnica" value="Cerámica"> Cerámica</label><br/>
              <label><input type="checkbox" class="tecnica" value="Dibujo"> Dibujo</label><br/>
              <label><input type="checkbox" class="tecnica" value="Grabado"> Grabado</label><br/>
              <label><input type="checkbox" class="tecnica" value="Arquitectura"> Arquitectura</label><br/>
              <label><input type="checkbox" class="tecnica" value="Diseño Gráfico"> Diseño Gráfico</label><br/>
              <label><input type="checkbox" class="tecnica" value="Escenografía"> Escenografía</label><br/>
              <label><input type="checkbox" class="tecnica" value="Escultura en Madera"> Escultura en Madera</label><br/>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            const dni = (document.getElementById('dni') as HTMLInputElement).value;
            const nombre_completo = (document.getElementById('nombre_completo') as HTMLInputElement).value;
            const apellido_paterno = (document.getElementById('apellido_paterno') as HTMLInputElement).value;
            const apellido_materno = (document.getElementById('apellido_materno') as HTMLInputElement).value;
            const direccion_residencia = (document.getElementById('direccion_residencia') as HTMLInputElement).value;
            const sexo = (document.getElementById('sexo') as HTMLSelectElement).value;
            const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
            const correo_electronico = (document.getElementById('correo_electronico') as HTMLInputElement).value;
            const contrasena = (document.getElementById('contrasena') as HTMLInputElement).value;

            const tecnicasChecked = Array.from(document.querySelectorAll('input.tecnica:checked')).map((el: any) => el.value);

            if (!dni || !nombre_completo || !apellido_paterno || !apellido_materno || !direccion_residencia || !sexo || !telefono || !correo_electronico || !contrasena) {
              Swal.showValidationMessage('Por favor, completa todos los campos obligatorios');
              return;
            }

            return {
              dni,
              nombre_completo,
              apellido_paterno,
              apellido_materno,
              direccion_residencia,
              sexo,
              telefono,
              correo_electronico,
              contrasena,
              tecnicas: tecnicasChecked
            };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Datos del especialista:', result.value);
            Swal.fire('¡Registro exitoso!', 'Los datos han sido guardados.', 'success');
          }
        });
      }

}

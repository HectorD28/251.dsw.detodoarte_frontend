import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RolesService } from './../../roles/roles.service';
import { LoadingService } from './../../loading-page/loading.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { MessagesService } from '../../service/message/messages.service';
import { ErrorInterceptor } from '../../auth/error/error.interceptor';
import { SideBarService } from '../../side-bar/service/side-bar.service';
import { TokenService } from '../../JWT/token.service';
import { finalize } from 'rxjs';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, ToastModule, RippleModule, FormsModule, ReactiveFormsModule, Tooltip],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  //Variables de control de la pantalla de carga y formulario
  isLoading: boolean = false;
  showPassword: boolean = false;
  username: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private rolesService: RolesService,
    private sidebarService: SideBarService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    contrasena: new FormControl('', [
      Validators.required,
    ]),
  });

  onSignIn(): void {
    //Verifica que el Login cumpla con el formato de validación
    if (this.loginForm.valid) {
      this.username = this.loginForm.controls['username'].value!.trim();
      this.contrasena = this.loginForm.controls['contrasena'].value!.trim();

      console.log('Username:', this.username);
      


      this.loadingService.show();

     

      this.authService.login(this.username, this.contrasena)
        .pipe(
          finalize(() => {
            this.loadingService.hide();
          }))
        .subscribe({
          next: (resp: any) => {
            this.initialConfigurationToken(resp.jwTtoken);
            console.log('Token recibido:', resp.jwTtoken);
            this.router.navigate(['/home']);
          },
          error: () => {
            //Verifica que no sea un error de conexión y Muestra un mensaje de error cuando se hace un bad request.
            if (!ErrorInterceptor.isConnectionError) {
              this.messagesService.errorMessage(
                'Credenciales incorrectas',
                'El usuario y/o contraseña que ingresaste son incorrectos. Por favor, verifica tus datos e inténtalo de nuevo'
              );
            }
          }
        });
    } else {
      this.messagesService.warningMessage(
        'Campos requeridos',
        'Por favor, completa todos los campos obligatorios antes de continuar',
      );
    }
  }

  //Método que configura lo necesario para ir al menú principal
  private initialConfigurationToken(tokenAuth: string): void {
    //Se guarda el token recibido del servidor
    this.tokenService.saveToken(tokenAuth);

    //Se valida la autenticidad del token
    if (this.tokenService.isTokenValid()) {
      //Se guarda el role del token en el servicio de roles
      const tokenRole = this.tokenService.getRole() ?? '';
      this.rolesService.setRole(tokenRole);

      //Se utiliza el role guardado del servicio para establecerlo en el servicio del sidebar
      const role = this.rolesService.getRole() ?? '';
      this.sidebarService.setItems(role);

      console.log('Role guardado:', tokenRole);
    }
  }
}

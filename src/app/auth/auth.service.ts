import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { RolesService } from '../roles/roles.service';
import { TokenService } from '../JWT/token.service';
import { SideBarService } from '../side-bar/service/side-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = '';

  constructor(
    private http: HttpClient,
    private roleService: RolesService,
    private tokenService: TokenService,
    private sidebarService: SideBarService
  ) {
    this.BASE_URL = environment.url;
  }

  //Método encargado de realizar la petición de Login
  login(username: string, contrasena: string) {
    return this.http.post(`${this.BASE_URL}/login`, {
      username,
      contrasena,
    });
  }

  //Método encargado de limpiar todos los datos relacionados al Login
  logout() {
    console.log('Logging out...', this.tokenService.getToken(),
      this.roleService.getRole(), this.sidebarService.items);

    this.tokenService.clearToken();
    this.roleService.clearRole();
    this.sidebarService.clearItems();
  }
}

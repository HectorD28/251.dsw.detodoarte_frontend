import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NavbarComponent } from './component/navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar/side-bar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    SideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agregar esto para permitir elementos personalizados
})
export class AppComponent {
  title = '251.dsw.detodoarte_frontend';

  showNavbar: boolean = false;
  showSidebar: boolean = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = (event as NavigationEnd).urlAfterRedirects;

        const navbarRoutes = ['/perfil', '/home','/auth','/orden', '/pagos-page', '/pruebas'];

        this.showNavbar = navbarRoutes.some((route) => currentUrl.startsWith(route));

        // Mostrar sidebar SOLO en rutas de perfil y similares
        const sidebarRoutes = ['/perfil', '/obradearte', '/solicitud-exposicion','/pruebas'];
        this.showSidebar = sidebarRoutes.some((route) => currentUrl.startsWith(route));
      });
  }
}

import { Component , OnInit} from '@angular/core';
import { SideBarService } from '../../side-bar/service/side-bar.service';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { CartComponent } from './../cart/cart.component';
import { faCartArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../service/cart/cart.service';

import { TokenService } from '../../JWT/token.service';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DrawerModule,
    Tooltip,
    ButtonModule,
    ConfirmPopupModule,
    CommonModule,
    DividerModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})


export class NavbarComponent implements OnInit{

  sideBarItems: any[] = [];

  public totalItems: number = 0
  public searchItem!: string;
  public cartIcon = faCartArrowDown
  public userIcon = faUser
  public productList = new BehaviorSubject<any>([])

  public isLoggedIn: boolean = false;  // Variable para verificar si hay token


  constructor(
    private confirmationService: ConfirmationService,
    public router: Router,
    private sidebarService: SideBarService,
    private authService: AuthService,

    private tokenService: TokenService,  // Inyectamos TokenService


    public cartModal: MatDialog,
    private cartService: CartService,
  ) {
    this.sideBarItems = this.sidebarService.items;

    

  }

  ngOnInit(): void {

    this.isLoggedIn = this.tokenService.getToken() !== null;  // Si hay token, se setea a true

    this.cartService.cantidadProductos$.subscribe((cantidad) => {
      this.totalItems = cantidad;  // Actualiza la cantidad de productos en el navbar
    });

  }

  openCart(){
    this.cartModal.open(CartComponent)
  }

  routeNavigate(route: string) {
    this.router.navigate([`/${route}`]);
  }


  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }

    Logout(event: Event) {
      Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        // Si cancelan no hace nada
      });
  }

  visible: boolean = false;
}
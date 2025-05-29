
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthModule } from './component/auth/auth.module';
import { authGuard } from './auth/auth.guard';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';
import { PerfilComponent } from './component/perfil/perfil.component'; // Asegúrate de importar el componente correctamente
import { SolicitudExposicionComponent } from './component/solicitud-exposicion/solicitud-exposicion.component';
import { TrabajaConNosotrosComponent } from './component/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { ObradearteComponent } from './component/obradearte/obradearte.component';


export const routes: Routes = [
    {path: '',
     redirectTo: '/home', 
     pathMatch: 'full'},

    {path: 'home', 
     component: HomeComponent},

    {path: 'registrar-persona',
     component:RegistrarPersonaComponent},

    {
        path: 'perfil', 
        component: PerfilComponent,
        canActivate: [authGuard],},

    {
        path: 'solicitud-exposicion', 
        component: SolicitudExposicionComponent},

    {
        path: 'trabaja-con-nosotros', 
        component: TrabajaConNosotrosComponent},
    
    {
        path: 'obradearte', 
        component: ObradearteComponent},
    
    {
        path: 'auth', 
        loadChildren: () => AuthModule, }
];


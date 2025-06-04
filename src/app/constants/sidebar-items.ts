export interface SidebarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

//Opciones en común para los roles
const COMMON_ITEMS: SidebarItem[] = [
  {
    name: 'Perfil',
    description: 'Dirige al perfil del usuario',
    tooltip: 'Perfil',
    icon: 'fas fa-home',
    route: '/perfil',
  },

  {
    name: 'Inicio',
    description: 'Dirige a la página de inicio',
    tooltip: 'Inicio',
    icon: 'fa-solid fa-share',
    route: '/home',
  },
];

//Opciones especificas por el rol (veterinario, recepcionista, farmaceutico)
export const SIDEBAR_ITEMS: { [role: string]: SidebarItem[] } = {
    especialista: [
      ...COMMON_ITEMS,
      {
        name: 'Mantener Mascotas',
        description: 'Dirige a la sección de Mantener mascotas',
        tooltip: 'Mascotas',
        icon: 'fas fa-paw',
        route: '/mascotas',
      },
      {
        name: 'Mantener Historias',
        description: 'Dirige a la sección de Mantener historias',
        tooltip: 'Historias',
        icon: 'fas fa-file-alt',
        route: '/historias',
      },
    ],
    usuario: [
      ...COMMON_ITEMS,
      {
        name: 'Mantener Clientes',
        description: 'Sección para gestionar los datos de los clientes',
        tooltip: 'Clientes',
        icon: 'fa fa-user',
        route: '/clientes',
      },
      {
        name: 'Registrar Pagos',
        description: 'Sección para gestionar los pagos',
        tooltip: 'Pagos',
        icon: 'fa fa-credit-card-alt',
        route: '/pagos',
      }
    ],
    artista: [
      ...COMMON_ITEMS,
      {
        name: 'Solcitar Exposición',
        description: 'Sección para solicitar una exposición de arte',
        tooltip: 'Exposición',
        icon: 'fa fa-medkit',
        route: '/solicitud-exposicion',
      },
    ],
    administrador: [
    ...COMMON_ITEMS,
    // Puedes agregar más ítems exclusivos para administrador aquí
    // Ejemplo:
     {
      name: 'Programar Exposición',
      description: 'Sección para programar una exposición',
      tooltip: 'Programar',
      icon: 'fa fa-calendar-plus',
      route: '/programar-exposicion',
    }
    ],
  };
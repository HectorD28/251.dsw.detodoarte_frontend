export interface NavbarItem {
  name: string;
  description: string;
  tooltip: string;
  icon: string;
  route: string;
}

const COMMON_ITEMS: NavbarItem[] = [
  {
    name: 'Pruebas',
    description: 'Dirige a la sección de pruebas',
    tooltip: 'Pruebas',
    icon: 'fa-solid fa-flask',
    route: '/pruebas',
  },
  
];

export const NAVBAR_ITEMS: { [role: string]: NavbarItem[] } = {
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
  };
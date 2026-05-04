import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'PRINCIPAL',
    isTitle: true
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/dashboard'
  },
  {
    id: 3,
    label: 'OPERACIONES',
    isTitle: true
  },
  {
    id: 4,
    label: 'Agenda / Citas',
    icon: 'ri-calendar-check-line',
    link: '/agenda'
  },
  {
    id: 5,
    label: 'Pedidos',
    icon: 'ri-shopping-cart-2-line',
    link: '/pedidos'
  },
  {
    id: 6,
    label: 'CATÁLOGOS',
    isTitle: true
  },
  {
    id: 7,
    label: 'Clientes',
    icon: 'ri-group-line',
    link: '/clientes'
  },
  {
    id: 8,
    label: 'Vehículos',
    icon: 'ri-car-line',
    link: '/vehiculos'
  },
  {
    id: 9,
    label: 'Servicios',
    icon: 'ri-service-line',
    link: '/servicios'
  },
  {
    id: 10,
    label: 'Promociones',
    icon: 'ri-coupon-3-line',
    link: '/promociones'
  },
  {
    id: 11,
    label: 'ADMINISTRACIÓN',
    isTitle: true
  },
  {
    id: 12,
    label: 'Usuarios',
    icon: 'ri-user-settings-line',
    link: '/usuarios'
  },
  {
    id: 13,
    label: 'Roles',
    icon: 'ri-shield-user-line',
    link: '/roles'
  },
  {
    id: 14,
    label: 'Reportes',
    icon: 'ri-bar-chart-box-line',
    link: '/reportes'
  },
  {
    id: 15,
    label: 'Opciones del Sistema',
    icon: 'ri-settings-3-line',
    link: '/opciones'
  },
];

import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/dashboard',
  },
  {
    id: 2,
    label: 'Operaciones',
    icon: 'ri-store-2-line',
    subItems: [
      { id: 3, label: 'Agenda / Citas', link: '/agenda', parentId: 2 },
      { id: 4, label: 'Pedidos', link: '/pedidos', parentId: 2 },
    ]
  },
  {
    id: 5,
    label: 'Catálogos',
    icon: 'ri-book-2-line',
    subItems: [
      { id: 6, label: 'Clientes', link: '/clientes', parentId: 5 },
      { id: 7, label: 'Vehículos', link: '/vehiculos', parentId: 5 },
      { id: 8, label: 'Servicios', link: '/servicios', parentId: 5 },
      { id: 9, label: 'Promociones', link: '/promociones', parentId: 5 },
    ]
  },
  {
    id: 10,
    label: 'Administración',
    icon: 'ri-settings-3-line',
    subItems: [
      { id: 11, label: 'Usuarios', link: '/usuarios', parentId: 10 },
      { id: 12, label: 'Roles', link: '/roles', parentId: 10 },
      { id: 13, label: 'Reportes', link: '/reportes', parentId: 10 },
      { id: 14, label: 'Opciones del Sistema', link: '/opciones', parentId: 10 },
    ]
  },
];

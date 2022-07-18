import {ComponentIcon, LevelIcon, OverIcon, SealingMachineIcon} from '../pages/components/icons/icons'
import {PartNumberIcon} from '../pages/components/icons/icons'
import { CartIcon } from '../pages/components/icons/icons'


export const activeRoute = (routeName:string, currentRoute:string):boolean => {
  return routeName === currentRoute? true : false;
}

export const currentNamePage = (currentRoute: string): string => {
  const menuItem = ROUTES.find(({path}) => path === currentRoute)
  return menuItem ? menuItem.label : 'not found';
}

export const ROUTES = [
  {
    path: '/',
    label: 'Nível',
    Component: LevelIcon
  },
  {
    path: '/part-number',
    label: 'Part Number',
    Component: PartNumberIcon
  },
  {
    path: '/over',
    label: 'Forno',
    Component: OverIcon
  },
  {
    path: '/cart',
    label: 'Carrinho',
    Component: CartIcon
  },
  {
    path: '/sealing-machine',
    label: 'Máquina de Vedação',
    Component: SealingMachineIcon
  },
  {
    path: '/component',
    label: 'Componente',
    Component: ComponentIcon
  },
]
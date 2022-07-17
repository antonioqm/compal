import {ComponentIcon, LevelIcon, OverIcon, SealingMachineIcon} from '../icons/icons'
import {PartNumberIcon} from '../icons/icons'
import { CartIcon } from '../icons/icons'


export const activeRoute = (routeName:string, currentRoute:string):boolean => {
  return routeName === currentRoute? true : false;
}

export const currentNamePage = (currentRoute: string): string => {
  const menuItem = MENU.find(({path}) => path === currentRoute)
  return menuItem ? menuItem.label : 'not found';
}

export const MENU = [
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
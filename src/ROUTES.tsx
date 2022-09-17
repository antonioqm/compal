import { JSXElementConstructor } from "react";
import {
  ComponentIcon, InventoryIcon, ItemsIcon,
  LevelIcon, SealingMachineIcon,
  ThicknessIcon
} from "./components/icons/icons";

import { FormInventory } from "./components/FormsUI/Forms/FormInventory";
import { FormLevel } from "./components/FormsUI/Forms/FormLevel";
import { FormThickness } from "./components/FormsUI/Forms/FormThickness";
import { FormPartNumber } from "./components/FormsUI/Forms/PartNumber";
import { CartIcon, PartNumberIcon } from "./components/icons/icons";

interface PageRouter {
  path: string;
  label: string;
  IconComponent: JSXElementConstructor<any>;
  FormComponent: JSXElementConstructor<any>;
}
export const activeRoute = (
  routeName: string,
  currentRoute: string
): boolean => {
  return routeName === currentRoute ? true : false;
};

export const currentPage = (currentRoute: string): PageRouter | null => {
  try {
    const pageRouter = ROUTES.find(
      (pageRouter) => pageRouter.path === currentRoute
    );
    return pageRouter ? pageRouter : null;
    
  } catch (err) {
    return null;
  }
};

export const ROUTES: PageRouter[] = [
  {
    path: "/nivel",
    label: "Nível",
    IconComponent: LevelIcon,
    FormComponent: FormLevel,
  },
  {
    path: "/espessura",
    label: "Espessura",
    IconComponent: ThicknessIcon,
    FormComponent: FormThickness,
  },
  {
    path: "/part-number",
    label: "Part Number",
    IconComponent: PartNumberIcon,
    FormComponent: FormPartNumber,
  },
  {
    path: "/itens",
    label: "Itens",
    IconComponent: ItemsIcon,
    FormComponent: FormInventory,
  },
  {
    path: "/inventory",
    label: "Inventário",
    IconComponent: InventoryIcon,
    FormComponent: FormInventory,
  },
  {
    path: "/feddercar",
    label: "Feddercar",
    IconComponent: CartIcon,
    FormComponent: FormPartNumber,
  },
  {
    path: "/sealing-machine",
    label: "Máquina de Vedação",
    IconComponent: SealingMachineIcon,
    FormComponent: FormPartNumber,
  },
  {
    path: "/component",
    label: "Componente",
    IconComponent: ComponentIcon,
    FormComponent: FormPartNumber,
  },
];

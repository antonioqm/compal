import { JSXElementConstructor, ReactElement } from "react";
import {
  ComponentIcon,
  LevelIcon,
  OverIcon,
  SealingMachineIcon,
} from "./components/icons/icons";
import { PartNumberIcon } from "./components/icons/icons";
import { CartIcon } from "./components/icons/icons";
import { FormPartNumber } from "./components/FormsUI/Forms/PartNumber";
import { FormInventory } from "../pages/inventory/FormInventory";
import { FormLevel } from "pages/Level/FormLevel";

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
  const pageRouter = ROUTES.find(
    (pageRouter) => pageRouter.path === currentRoute
  );
  return pageRouter ? pageRouter : null;
};

export const ROUTES: PageRouter[] = [
  {
    path: "/",
    label: "Nível",
    IconComponent: LevelIcon,
    FormComponent: FormLevel,
  },
  {
    path: "/part-number",
    label: "Part Number",
    IconComponent: PartNumberIcon,
    FormComponent: FormPartNumber,
  },
  {
    path: "/inventory",
    label: "Inventário",
    IconComponent: OverIcon,
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
